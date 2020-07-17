var mainModel = require('../models/mainModel');
var adminModel = require('../models/adminModel');
var mainController = function () { }
mainController.inicio = (req, res) => {
    if (!req.session.carrito) {
        req.session.carrito = {};
    }
    mainModel.novedades((err, rows) => {
        if (err) throw err;
        else res.render("inicio", { style: "inicio.css", bootstrap: true, primero: rows[0], libros: rows.slice(1, 6) });
    });
};
mainController.sucursal = (req, res) => {
    res.render("sucursal", {style: "sucursal.css"});
};
mainController.politica = (req, res) => {
    res.render("politica", {style: "politicas.css"});
};
mainController.contacto = (req, res) => {
    res.render("contacto", {style: "contacto.css"});
};
mainController.libros = async (req, res) => {
    const limit = 21;
    var page = req.query.page;
    if(!page) page = 1;
    const offset = (page - 1) * limit;
    const row  = await mainModel.cantidadDeLIbros();
    const { cantidad } = row[0];
    const npages = Math.ceil(cantidad / limit);
    const libros = await mainModel.libros(limit, offset);
    var pages = [];
    for (let i = 1; i <= npages; i++) {
        pages.push(i);
    }
    res.render("libros", { style: "libros.css", libros, pages, pag: page });
};
mainController.categorias = async (req, res) => {
    const categorias = await adminModel.categorias();
    res.render("categorias", { style: "card_menu.css", categorias });
};
mainController.autores = async (req, res) => {
    const autores = await adminModel.autores();
    res.render("autores", { style: "card_menu.css", autores });
};
mainController.editoriales = async (req, res) => {
    const editoriales = await adminModel.editoriales();
    res.render("editoriales", { style: "card_menu.css", editoriales });
}
mainController.librosPorIDCategoria = (req, res) => {
    const { id } = req.params;
    mainModel.librosPorIDCategoria([id], (err, rows) => {
        if (rows.length > 0) {
            res.render("libros", { style: "libros.css", libros: rows });
        } else {
            req.flash('error', 'No hay libros asociados');
            res.redirect('/categorias');
        }
    });
};
mainController.librosPorIDAutor = (req, res) => {
    const { id } = req.params;
    mainModel.librosPorIDAutor([id], (err, rows) => {
        if (rows.length > 0) {
            res.render("libros", { style: "libros.css", libros: rows });
        } else {
            req.flash('error', 'No hay libros asociados');
            res.redirect('/autores');
        }
    });
};
mainController.librosPorIDEditorial = (req, res) => {
    const { id } = req.params;
    mainModel.librosPorIDEditorial([id], (err, rows) => {
        if (rows.length > 0) {
            res.render("libros", { style: "libros.css", libros: rows });
        } else {
            req.flash('error', 'No hay libros asociados');
            res.redirect('/editorial');
        }
    });
};
mainController.librosBusqueda = (req, res) => {
    const { title } = req.params;
    const substr = '%'.concat(title.concat('%'));
    mainModel.librosBusqueda([substr], (err, rows) => {
        var libros;
        if (title.length == 0) {
            libros = [];
        }
        else libros = rows;
        res.render("libros", { style: "libros.css", libros });
    });
};
mainController.buscar = (req, res) => {
    const { search } = req.body;
    const route = "/buscar/".concat(search);
    res.redirect(route);
};
mainController.remates = (req, res) => {
    mainModel.remates((err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render("remates", { style: "otros.css", remates: rows });
        }
    });
};
mainController.tecnologia = (req, res) => {
    mainModel.tecnologia((err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render("tecnologia", { style: "otros.css", tecnologia: rows });
        }
    });
};
mainController.libro = (req, res, next) => {
    const { id } = req.params;
    mainModel.libro([id], (err, rows) => {
        if (rows.length == 0) {
            next();
            return;
        } else res.render("libro", { style: "libro.css", libro: rows[0] });
    });
};
module.exports = mainController;