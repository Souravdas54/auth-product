const mongoose = require('mongoose')

const Dbconnection = async () => {
    try {
        const connectDb = await mongoose.connect(process.env.MONGODB_CONNECT_URL)
        if (connectDb) {
            console.log('MongoDB connection successfull');

        }
    } catch (error) {
console.error(error);

    }
}
module.exports = Dbconnection