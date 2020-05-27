const bcrypt = require('bcryptjs');
const helpers = {};
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedpassword = await bcrypt.hash(password, salt);
    return encryptedpassword;
};
helpers.matchPassword = async (password, encryptedpassword) => {
    try {
        await bcrypt.compare(password, encryptedpassword);
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = helpers;