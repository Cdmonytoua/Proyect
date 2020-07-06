var mainModel = require('../models/mainModel');
var adminModel = require('../models/adminModel');
var mainController = function () { }
mainController.inicio = (req, res) => {
    if (!req.session.carrito) {
        req.session.carrito = {};
    }
    res.render("inicio", { style: "inicio.css" });
};
mainController.libros = async (req, res) => {
    const libros = await mainModel.libros();
    res.render("libros", { style: "libros.css", libros });
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
    const { search } = req.body;
    const substr = '%'.concat(search.concat('%'));
    mainModel.librosBusqueda([substr], (err, rows) => {
        var libros;
        if (search.length == 0) {
            libros = [];
        }
        else libros = rows;
        res.render("libros", { style: "libros.css", libros });
    });
};
module.exports = mainController;