const express = require("express");
const router = express.Router();

const upload = require('../helper/multer');

const Productdata = require("../controllers/productController");

router.post('/create/product', upload.single('image'), Productdata.crestedata);

router.get('/get/product', Productdata.getallproduct)
router.get('/get/product/:id', Productdata.getproductbyid)

router.put('/update/product/:id', upload.single('image'), Productdata.updateproductbyid)

router.delete('/delete/product/:id', Productdata.deleteproductbyid)



module.exports = router;