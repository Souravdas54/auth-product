const express = require("express");
const router = express.Router();
const upload = require('../helper/multer')
const Productdata = require("../controllers/productController");
const Userdata = require('../controllers/authController');
const AuthCheckToken = require('../middleware/authMiddleware')


router.post('/register/user', Userdata.register);
router.post('/signin', AuthCheckToken, Userdata.signin)

router.post('/create', upload.single('image'), Productdata.crestedata);


module.exports = router;
