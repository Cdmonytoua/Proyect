var carritoModel = require('../models/carritoModel');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var carritoController = function () { }
carritoController.carrito = (req, res) => {
    req.session.total = 0;
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var ids = Object.keys(carrito);
    if (ids.length > 0) {
        carritoModel.carrito(ids, (err, rows) => {
            if (err) throw err;
            libros = rows;
            var total = 0;
            libros.forEach(libro => {
                const { Id_Libro, Precio } = libro;
                total += Math.round((carrito[Id_Libro] * Precio) * 100) / 100;
            });
            req.session.total = total;
            res.render('carrito', { style: "carrito.css", libros, carrito, total });
        });
    } else res.render("carrito", { style: "carrito.css", carrito });
};
carritoController.limpiar = (req, res) => {
    req.session.carrito = {};
    req.session.total = 0;
    req.flash('exito', 'Carrito vaciado');
    res.redirect('/carrito');
};
carritoController.agregarACarrito = (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito[id] = (carrito[id] || 0) + cantidad;
    req.flash('exito', 'Libro agregado correctamente');
    res.redirect('back');
};
carritoController.compras = (req, res) => {
    var total = req.session.total;
    if (!total) {
        total = req.session.total = 0;
    }
    if (total == 0) {
        req.flash('error', 'No ha agregado productos al carrito de compras');
        res.redirect('back');
    } else {
        res.render('compra', { total, bootstrap: true });
    }
};
carritoController.comprar = (req, res) => {
    const stripeToken = req.body.stripeToken;
    var total = req.session.total;
    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: total
    }, (err, charge) => {
        if (err) {
            req.flash('error', 'Ocurrió un error')
            res.redirect("/carrito/comprar");
        } else {
            req.session.carrito = {};
            req.session.total = 0;
            req.flash('exito', 'Compra realizada con éxito');
            res.redirect('/carrito');
        }

    });
};
module.exports = carritoController;