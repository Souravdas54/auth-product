const express = require("express");
const router = express.Router();

const Userdata = require('../../controllers/ejs/AuthEjsController');



router.get('/register/user',Userdata.viewregister)

router.get('/signin/user', Userdata.viewsignin)


module.exports = router;
