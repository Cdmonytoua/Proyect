const express = require('express');
const router = express.Router();
const pool = require('../db');
const helper = require("../lib/helpers");
router.get("/", (req, res) => {
    res.render("inicio", { style: "inicio.css" });
});
router.get("/admin", helper.isAdmin, (req, res) => {
    res.render("admin_autor", { layout: "admin" });
});
router.get("/admin/libros", helper.isAdmin, (req, res) => {
    res.render("admin_libros", { layout: "admin" });
});
router.get("/admin/editorial", helper.isAdmin, (req, res) => {
    res.render("admin_editorial", { layout: "admin" });
});
router.get("/admin/categoria", helper.isAdmin, (req, res) => {
    res.render("admin_categoria", { layout: "admin" });
});
router.get("/admin/autor", helper.isAdmin, (req, res) => {
    res.render("admin_autor", { layout: "admin" });
});
router.get("/categorias", async (req, res) => {
    const categorias = await pool.query("SELECT * FROM Categorias");
    res.render("categorias", {style: "categorias.css", categorias});
});
router.get("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT Nombre FROM Libros WHERE Categoria = ?', [id]);
    if(libros.length > 0){
        res.render("libros_por_categoria", { style: "libros_por_categoria.css", libros });
    }else{
        res.redirect('/categorias');
    }
});

module.exports = router;
