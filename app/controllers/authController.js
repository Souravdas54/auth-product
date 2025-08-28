const hashPassword = require("../helper/hashPassword");
const User = require("../model/authModule");

const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        console.log("Request Body:", req.body);

        try {
            const { name, email, phone, city, password } = req.body;

            if (!name || !email || !phone || !city || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const hashingpassword = await hashPassword(password)

            const registerdata = new User({ name, email, phone, city, password:hashingpassword },{new:true});
            const newdata = await registerdata.save();

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
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                });
            }

            const user = await User.findOne({ email }); 
            if (!user) {
                return res.status(400).json({
                    message: "Email not found",
                });
            }

            const matchPass = await bcrypt.compare(password, user.password); 
            if (!matchPass) {
                return res.status(400).json({
                    message: "Password incorrect",
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "30m" }
            );

            return res.status(200).json({
                message: "Login successful",
                user: {
                    name: user.name,
                    email: user.email,
                },
                token: token,
            });
        } catch (error) {
            console.error("Signin Error:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}

module.exports = new AuthController();
