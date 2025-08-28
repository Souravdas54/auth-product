const Product = require('../model/productModule');
const statusCode = require('../helper/status');

class ApiProductController {
    async crestedata(req, res) {
        try {
            const { name, category, price } = req.body;
            const image = req.file ? req.file.path : null;

            if (!name || !category || !price || !image) {
                return res.status(statusCode.BAD_REQUEST).json({
                    success: false,
                    message: 'All fields (name, category, price, image) are required'
                });
            }

            const newProduct = new Product({ name, category, price, image });
            const savedProduct = await newProduct.save();

            return res.status(statusCode.CREATED).json({
                success: true,
                message: 'Product created successfully',
                data: savedProduct
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    }

   
}

module.exports = new ApiProductController();