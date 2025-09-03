const hashPassword = require("../helper/hashPassword");
const jwt = require('jsonwebtoken');
const User = require("../model/authModule");
const bcrypt = require('bcryptjs')
const statusCode = require("../helper/status");


class AuthController {

    async register(req, res) {
        console.log("Request Body:", req.body);
        try {
            const { name, email, phone, city, gender, password } = req.body;

            if (!name || !email || !phone || !city || !password) { // Check all fields
                return res.status(statusCode.BAD_REQUEST).json({ message: "All fields are required" });
            }

            const sameEmail = await User.findOne({ email }) // Get Same Email ID
            const validemail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/ // Email validation 

            if (!validemail.test(email)) {
                return res.status(statusCode.BAD_REQUEST).json({ message: "Please enter a valid email address" })

            }
            if (sameEmail) {
                return res.status(statusCode.BAD_REQUEST).json({ message: "Email already exists" })
            }


            const newImagepath = req?.file ? req?.file?.path?.replace(/\\/g, '/') : null;

            // const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


            if (password.length < 6) {
                return res.status(statusCode.BAD_REQUEST).json({
                    // message: "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
                    message: "Password must be at least 6 characters long."
                });
            }
            const hashingpassword = await hashPassword(password) // Hash Password

            const registerdata = new User({ name, email, phone, gender, city, image: newImagepath, password: hashingpassword });


            const newdata = await registerdata.save();

            res.redirect('/auth/signin/user')

            return res.status(201).json({
                success: true,
                message: "Registration successful",
                data: newdata
            });

        } catch (error) {
            console.error("Registration Error:", error);
            return res.status(500).json({
                message: "Registration failed, internal server error",
                error: error.message
            });
        }
    }

    async signin(req, res) {
        console.log("LOGIN", req.body);

        try {
            const { email, password, rememberme } = req.body;

            if (!email || !password) {
                return res.status(statusCode.BAD_REQUEST).render("login", {
                    title: "Sign In",
                    email,
                    rememberme,
                    error: "Email and password are required"
                });
            }

            const user = await User.findOne({ email });
            const validemail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Email validation 

            if (!validemail.test(email)) {
                return res.status(statusCode.BAD_REQUEST).render("login", {
                title: "Sign In",
                email,
                rememberme,
                error: "Please enter a valid email address"
                    
                    })

            }
            if (!user) {
                return res.status(statusCode.BAD_REQUEST).render("login", {
                title: "Sign In",
                email,
                rememberme,
                error: "Please enter a valid email address"
                });
            }


            const matchPass = await bcrypt.compare(password, user.password);
            if (!matchPass) {
                return res.status(statusCode.BAD_REQUEST).render("login", {
                title: "Sign In",
                email,
                rememberme,
                error: "Please enter a valid email address"
                });
            }

            if (rememberme) {
                res.cookie('email', email,
                    { maxAge: 30 * 60 * 1000 })

                // res.cookie('password', password,
                //     { maxAge: 30 * 60 * 1000 })

                res.cookie('rememberme', true,
                    { maxAge: 30 * 60 * 1000 })
            } else {
                res.clearCookie('email')
                // res.clearCookie('password')
                res.clearCookie('rememberme')
            }



            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender,
                    city: user.city,
                    image: user.image,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "30m" }
            );

            if (token) {
                res.cookie('token', token, {
                    httpOnly: true,
                    // secure: false, // production hole true
                    maxAge: 30 * 60 * 1000 // 30 min
                })
                res.redirect('/auth/dashoard/user') // Redirect Dashboard page 
            }
            //  else {
            //     res.redirect('/signin/user')
            // }

            // if(rememberme){
            //     req.session.cookie.maxAge =  30 * 60 * 1000 ;
            // }else{
            //     req.session.cookie.expires = false;
            // }

            return res.status(200).json({
                message: "Login successful",
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error("Signin Error:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }


    async profile(req, res) {

        try {
            const user = await User.findById(req.user.id).select('-password')

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.render('dashboard', { title: 'Dashboard', user })

        } catch (error) {

        }
    }

    async logout(req, res) {
        res.clearCookie('token')
        return res.redirect('/auth/signin/user')
    }
}

module.exports = new AuthController();
