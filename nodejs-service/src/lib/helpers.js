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
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Necesitas iniciar sesión primero');
        return res.redirect('/');
    }
};
helpers.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.Rol == 'admin') {
        return next();
    }
    return res.redirect('/');
};
helpers.isnotLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};
helpers.pagination = async (id, req, res, cantidad, curr_page, callback) => {
    const limit = 24;
    var page = req.query.page;
    if (page == null || page <= 0 || page > cantidad || isNaN(page)) {
        page = 1;
    }
    const offset = (page - 1) * limit;
    const npages = Math.ceil(cantidad / limit);
    let libros;
    if (id == null) {

        libros = await callback(limit, offset);
    } else {
        libros = await callback(id, limit, offset);
    }
    var pages = [];
    for (let i = 1; i <= npages; i++) {
        pages.push(i);
    }
    let prev = parseInt(page) - 1;
    let next = parseInt(page) + 1;
    if (prev <= 0) prev = npages;
    if (next > npages) next = 1;
    res.render("libros", { style: "libros.css", libros, pages, pag: page, prev, next, curr_page });
};
module.exports = helpers;