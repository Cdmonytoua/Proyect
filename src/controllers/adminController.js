var adminModel = require('../models/adminModel');

var adminController = function () { }
adminController.inicio = async (req, res) => {
    const categorias = await adminModel.categorias();
    const editoriales = await adminModel.editoriales();
    const autores = await adminModel.autores();
    res.render("admin", { style: "tabla.css", layout: "admin", categorias, editoriales, autores });
};
adminController.tablas = async (req, res) => {
    const categorias = await adminModel.categorias();
    const editoriales = await adminModel.editoriales();
    const autores = await adminModel.autores();
    res.render("tablas", { layout: false, categorias, editoriales, autores });
};
adminController.libros = (req, res) => {
    res.render("admin_libros", { layout: "admin" });
};
adminController.editoriales = (req, res) => {
    res.render("admin_editorial", { layout: "admin" });
};
adminController.categorias = (req, res) => {
    res.render("admin_categoria", { layout: "admin" });
};
adminController.autores = (req, res) => {
    res.render("admin_autor", { layout: "admin" });
};
adminController.agregarEditorial = (req, res) => {
    const { Nombre } = req.body;
    let editorial = { Nombre };
    adminModel.insertarEditorial([editorial], (err) => {
        if (err) {
            req.flash('error', 'Error al tratar de insertar');
        } else {
            req.flash('exito', 'Editorial agregada correctamente');
        }
        res.redirect('/admin/editorial');
    });
};
adminController.agregarCategoria = (req, res) => {
    const { Nombre } = req.body;
    let categoria = { Nombre };
    adminModel.insertarCategoria([categoria], (err) => {
        if (err) {
            req.flash('error', 'Error al tratar de insertar');
        } else {
            req.flash('exito', 'Categoría agregada correctamente');
        }
        res.redirect('/admin/categoria');
    });
};
adminController.agregarAutor = (req, res) => {
    const { Nombre } = req.body;
    let autor = { Nombre };
    adminModel.insertarAutor([autor], (err) => {
        if (err) {
            req.flash('error', 'Error al tratar de insertar');
        } else {
            req.flash('exito', 'Autor agregado correctamente');
        }
        res.redirect('/admin/autor');
    });
};
adminController.agregarLibro = (req, res) => {
    const { Nombre, Categoria, Autor, Anio, Editorial, Cantidad, Precio } = req.body;
    let libro = { Nombre, Categoria, Autor, Anio, Editorial, Cantidad, Precio };
    adminModel.insertarLibro([libro], (err) => {
        if (err) {
            req.flash('error', 'Error al tratar de insertar');
        } else {
            req.flash('exito', 'Libro agregado correctamente');
        }
        res.redirect('/admin/libros');
    });
};
adminController.eliminarCategoria = (req, res) => {
    const { id } = req.params;
    adminModel.eliminarCategoria([id], (err, rows) => {
        if (rows.affectedRows == 0) {
            req.flash('error', 'No existe categoría con ese ID');
        }
        res.redirect('/admin');
    });

};
adminController.eliminarEditorial = (req, res) => {
    const { id } = req.params;
    adminModel.eliminarEditorial([id], (err, rows) => {
        if (rows.affectedRows == 0) {
            req.flash('error', 'No existe editorial con ese ID');
        }
        res.redirect('/admin');
    });
};
adminController.eliminarAutor = (req, res) => {
    const { id } = req.params;
    adminModel.eliminarAutor([id], (err, rows) => {
        if (rows.affectedRows == 0) {
            req.flash('error', 'No existe autor con ese ID');
        }
        res.redirect('/admin');
    });
};
module.exports = adminController;