const express = require('express');
const router = express.Router();
const pool = require('../db');
var data;
pool.query('SELECT * FROM Libros', function (err, rows) {
    if (err) throw err;
    data = rows;
});
router.get("/carrito", (req, res) => {
    res.render("carrito");
    console.log(req.session.carrito);
});
router.post("/agregar_a_carrito", (req, res) => {
    carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
        console.log("here");
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito[id] = (carrito[id] || 0) + cantidad;
    var ids = Object.keys(carrito);
    console.log(carrito);
    res.redirect('back');
});
module.exports = router;