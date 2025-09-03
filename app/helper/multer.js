const multer = require("multer")
const User = require('../model/authModule');
const statusCode = require("./status");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const checkImageformat = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return cb(new Error("Invalid file type. Please upload only JPG, JPEG, PNG , WEBP images. !"), false)
    }
    cb(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: checkImageformat,
    limits: {
        fieldSize: 5 * 1024 * 1024,
        files: 1
    }
})

module.exports = upload;