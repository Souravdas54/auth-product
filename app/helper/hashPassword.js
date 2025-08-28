const bcrypt = require('bcryptjs')

async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.error("hashing error", error);

    }

}

module.exports = hashPassword