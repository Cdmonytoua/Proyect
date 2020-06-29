const express = require('express');
const router = express.Router();
const pool = require('../db');
const helper = require("../lib/helpers");
router.get("/", (req, res) => {
    if (!req.session.carrito) {
        req.session.carrito = {};
    }
    res.render("inicio", { style: "inicio.css" });
});
router.get("/libros", async (req, res) => {
    const libros = await pool.query("SELECT * FROM Libros");
    res.render("libros", { style: "libros.css", libros });
});
router.get("/categorias", async (req, res) => {
    const categorias = await pool.query("SELECT * FROM Categorias");
    res.render("categorias", { style: "card_menu.css", categorias });
});
router.get("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT * FROM Libros WHERE Categoria = ?', [id]);
    if (libros.length > 0) {
        res.render("libros", { style: "libros.css", libros });
    } else {
        req.flash('error', 'No hay libros asociados');
        res.redirect('/categorias');
    }
});
router.get("/autores", async (req, res) => {
    const autores = await pool.query("SELECT * FROM Autores");
    res.render("autores", { style: "card_menu.css", autores });
});
router.get("/autores/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT * FROM Libros WHERE Autor = ?', [id]);
    if (libros.length > 0) {
        res.render("libros", { style: "libros.css", libros });
    } else {
        req.flash('error', 'No hay libros asociados');
        res.redirect('/autores');
    }
});
router.get("/editoriales", async (req, res) => {
    const editoriales = await pool.query("SELECT * FROM Editoriales");
    res.render("editoriales", { style: "card_menu.css", editoriales });
});
router.get("/editoriales/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT * FROM Libros WHERE Editorial = ?', [id]);
    if (libros.length > 0) {
        res.render("libros", { style: "libros.css", libros });
    } else {
        req.flash('error', 'No hay libros asociados');
        res.redirect('/editoriales');
    }
});

router.post("/buscar", async (req, res) => {
    const { search } = req.body;
    const sql = '%'.concat(search.concat('%'));
    await pool.query('SELECT * FROM Libros WHERE Nombre LIKE ?', [sql], function (err, rows) {
        if (err) throw err;
        const libros = rows;
        res.render("libros", { style: "libros.css", libros });
    });
});
module.exports = router;
