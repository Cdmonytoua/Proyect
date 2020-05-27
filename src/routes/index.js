const express = require('express');
const router = express.Router();
const pool = require('../db');
router.get("/", (req, res) => {
    res.render("inicio",{style: "inicio.css"});
});

router.get("/categorias", async (req, res) => {
    const categorias = await pool.query("SELECT * FROM Categorias");
    res.render("categorias", { categorias });
});
router.get("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT Nombre FROM Libros WHERE Categoria = ?', [id]);
    res.render("libros_por_categoria", { style: "libros_por_categoria.css", libros });
});

module.exports = router;
