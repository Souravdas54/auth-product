

class AuthEjsController {
    async viewregister(req, res) {
        res.render('register', {
            title: "Sign Up"
        })
    }

    async viewsignin(req, res) {
        res.render('login', {
            title: 'Sign In'
        })
    }

}

module.exports = new AuthEjsController()