

class AuthEjsController {
    async viewregister(req, res) {
        try {
            res.render('register', {
                title: "Sign Up",
                email: req.cookies.email || "",
                rememberme: req.cookies.rememberme === "true"
            })
        } catch (error) {
            console.error("Render Login Error:", error);
        }
    }

    async viewsignin(req, res) {
        res.render('login', {
            title: 'Sign In'
        })
    }

    async dashboard(req, res) {
        res.render('dashboard', {
            title: "Dashboard"
        })
    }
}

module.exports = new AuthEjsController()