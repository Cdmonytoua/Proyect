const bcrypt = require('bcryptjs');
const helpers = {};
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedpassword = await bcrypt.hash(password, salt);
    return encryptedpassword;
};
helpers.matchPassword = async (password, encryptedpassword) => {
    try {
        return await bcrypt.compare(password, encryptedpassword);
        
    } catch (error) {
        console.log(error);
    }
};
helpers.isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
};
helpers.isnotLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
};
module.exports = helpers;