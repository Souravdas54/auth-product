const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashpass = await bcrypt.hash(password, saltRounds);
        return hashpass;

    } catch (error) {
        console.error("hashing error", error);
        throw error;
    }

}

module.exports = hashPassword