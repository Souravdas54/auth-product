const express = require("express");
const router = express.Router();

const upload = require('../helper/multer')

const Userdata = require('../controllers/authController');

// const { RequiredToken } = require('../middleware/authMiddleware')

router.post('/register/user', upload.single('image'),Userdata.register);

module.exports = router;
