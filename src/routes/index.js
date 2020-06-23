const express = require('express');
const router = express.Router();
const pool = require('../db');
const helper = require("../lib/helpers");
router.get("/", (req, res) => {
    if(req.session.carrito){

    }else req.session.carrito = {};
    console.log(req.session);
    res.render("inicio", { style: "inicio.css" });
});
router.get("/categorias", async (req, res) => {
    const categorias = await pool.query("SELECT * FROM Categorias");
    res.render("categorias", {style: "card_menu.css", categorias});
});
router.get("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const libros = await pool.query('SELECT * FROM Libros WHERE Categoria = ?', [id]);
    if(libros.length > 0){
        res.render("libros_por_categoria", { style: "libros_por_categoria.css", libros });
    }else{
        res.redirect('/categorias');
    }
});
router.get("/autores", async (req, res) => {
    const autores = await pool.query("SELECT * FROM Autores");
    res.render("autores", {style: "card_menu.css", autores});
});
router.get("/editoriales", async (req, res) => {
    const editoriales = await pool.query("SELECT * FROM Editoriales");
    res.render("editoriales", {style: "card_menu.css", editoriales});
});

module.exports = router;
