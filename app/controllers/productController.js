const Product = require('../model/productModule');
const statusCode = require('../helper/status');
const fs = require('fs')

class ApiProductController {
    async crestedata(req, res) {
        try {
            const { name, category, price } = req.body;
            const imagepath = req.file ? req.file.path : null;

            // if (!name || !category || !price) {
            //     return res.status(statusCode.BAD_REQUEST).json({
            //         success: false,
            //         message: 'All fields (name, category, price, image) are required'
            //     });
            // }

            const newProduct = new Product({ name, category, price, image: imagepath });
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

    async getallproduct(req, res) {
        try {
            const gettuser = await Product.find()
            if (gettuser.length === 0) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: 'Product not found.'
                })
            }
            return res.status(statusCode.CREATED).json({
                message: "Product creted successful ✔",
                total: gettuser.length,
                data: gettuser
            })
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })
        }
    }

    async getproductbyid(req, res) {
        try {
            const productid = await Product.findById(req.params.id)
            if (!productid) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "Product not found."
                })
            }
            return res.status(statusCode.OK).json({
                message: "Product found successfully ✔",
                data: productid
            })
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' })

        }
    }

     async updateproductbyid(req, res) {
        console.log("Request Body:", req.body);

        try {
            const id = req.params.id;
            const { name, category, price } = req.body;

            const updatedata = { name, category, price };

            const currectproduct = await Product.findById(id);

            if (!currectproduct) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: 'Product not found'
                });
            }

            const oldImage = currectproduct.image;

            // if new image uploaded
            if (req.file) {
                if (oldImage && fs.existsSync(oldImage)) {
                    fs.unlinkSync(oldImage); // delete old image
                }
                updatedata.image = req.file.path.replace(/\\/g, '/'); // normalize path
            }

            const updateproduct = await Product.findByIdAndUpdate(id, updatedata, { new: true });

            if (!updateproduct) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: 'Product not found'
                });
            }

            return res.status(statusCode.OK).json({
                message: "Product updated successfully ✔",
                data: updateproduct
            });

        } catch (error) {
            console.error("Update Error:", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' });
        }
    }

    // ✅ Delete product
    async deleteproductbyid(req, res) {
        try {
            const id = req.params.id;

            const deleteproduct = await Product.findById(id);
            if (!deleteproduct) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: 'Product not found'
                });
            }

            const oldImage = deleteproduct.image;

            if (oldImage && fs.existsSync(oldImage)) {
                fs.unlinkSync(oldImage); // delete image
            }

            await Product.findByIdAndDelete(id);

            return res.status(statusCode.OK).json({
                message: "Product and image deleted successfully ✔"
            });

        } catch (error) {
            console.error("Delete Error:", error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error!' });
        }
    }
}

module.exports = new ApiProductController();