const express = require("express");
const router = express.Router();

const Userdata = require('../../controllers/ejs/AuthEjsController');

// const { RequiredToken } = require('../middleware/authMiddleware')



router.get('/register/user',Userdata.viewregister)

router.get('/signin/user', Userdata.viewsignin)

router.get('/dashoard/user', Userdata.dashboard)




module.exports = router;
