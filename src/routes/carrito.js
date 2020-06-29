const express = require('express');
const router = express.Router();
const pool = require('../db');
router.get("/limpiar", (req, res) => {
    req.session.carrito = {};
    req.flash('exito', 'Carrito vaciado');
    res.redirect('/carrito');
});
router.get("/carrito", async (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var ids = Object.keys(carrito);
    if (ids.length > 0) {
        await pool.query('SELECT * FROM Libros WHERE Id_Libro IN (' + ids + ')', (err, rows) => {
            if (err) throw err;
            libros = rows;
            res.render('carrito', { style: "carrito.css", libros, carrito });
        });
    } else res.render("carrito", { style: "carrito.css", carrito });
});
router.post("/agregar_a_carrito", (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito[id] = (carrito[id] || 0) + cantidad;
    req.flash('exito', 'Libro agregado correctamente');
    res.redirect('back');
});
module.exports = router;
