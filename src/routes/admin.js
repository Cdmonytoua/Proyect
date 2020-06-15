const express = require('express');
const router = express.Router();
const pool = require('../db');
const helper = require("../lib/helpers");
router.get("/admin", helper.isAdmin, async (req, res) => {
    const categorias = await pool.query("SELECT * FROM Categorias");
    const editoriales = await pool.query("SELECT * FROM Editoriales");
    const autores = await pool.query("SELECT * FROM Autores");
    res.render("admin", { style: "tabla.css", layout: "admin" , categorias, editoriales, autores});
});
router.get("/admin/libros", helper.isAdmin, (req, res) => {
    res.render("admin_libros", { layout: "admin" });
});
router.post("/admin/libros", helper.isAdmin, async (req, res) => {
    const { Nombre, Categoria, Autor, Anio, Editorial, Cantidad, Precio } = req.body;
    let libro = { Nombre, Categoria, Autor, Anio, Editorial, Cantidad, Precio };
    try {
        await pool.query("INSERT INTO Libros SET ?", [libro]);
        req.flash('exito', 'Libro agregado correctamente');
    } catch (error) {
        req.flash('error', 'Error al tratar de insertar');
    }
    res.redirect('/admin/libros');
});
router.get("/admin/editorial", helper.isAdmin, (req, res) => {
    res.render("admin_editorial", { layout: "admin" });
});
router.post("/admin/editorial", helper.isAdmin, async (req, res) => {
    const { Nombre } = req.body;
    let editorial = { Nombre };
    try {
        await pool.query("INSERT INTO Editoriales SET ?", [editorial]);
        req.flash('exito', 'Editorial agregada correctamente');
    } catch (error) {
        req.flash('error', 'Error al tratar de insertar');
    }
    res.redirect('/admin/editorial');
});
router.get("/admin/categoria", helper.isAdmin, (req, res) => {
    res.render("admin_categoria", { layout: "admin" });
});
router.post("/admin/categoria", helper.isAdmin, async (req, res) => {
    const { Nombre } = req.body;
    let categoria = { Nombre };
    try {
        await pool.query("INSERT INTO Categorias SET ?", [categoria]);
        req.flash('exito', 'Categoría agregada correctamente');
    } catch (error) {
        req.flash('error', 'Error al tratar de insertar');
    }
    res.redirect('/admin/categoria');
});
router.get("/admin/autor", helper.isAdmin, (req, res) => {
    res.render("admin_autor", { layout: "admin" });
});
router.post("/admin/autor", helper.isAdmin, async (req, res) => {
    const { Nombre } = req.body;
    let autor = { Nombre };
    try {
        await pool.query("INSERT INTO Autores SET ?", [autor]);
        req.flash('exito', 'Autor agregado correctamente');
    } catch (error) {
        req.flash('error', 'Error al tratar de insertar');
    }
    res.redirect('/admin/autor');
});
module.exports = router;