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
    var carritoLibros = carrito['carrito_libros'];
    if(!carritoLibros){
        carritoLibros = req.session.carrito['carrito_libros'] = {};   
    }
    var carritoRemates = carrito['carrito_remates'];
    if(!carritoRemates){
        carritoRemates = req.session.carrito['carrito_remates'] = {};   
    }
    var carritoTecnologia = carrito['carrito_tecnologia'];
    if(!carritoTecnologia){
        carritoTecnologia = req.session.carrito['carrito_tecnologia'] = {};   
    }
    var idsLibros = Object.keys(carritoLibros);
    var idsRemates = Object.keys(carritoRemates);
    var idsTecnologia = Object.keys(carritoTecnologia);
    console.log(carrito);
    if (idsLibros.length > 0 || idsRemates.length > 0 || idsTecnologia.length > 0) {
        carritoModel.carritoLibros(idsLibros, (err, rows) => {
            var libros = rows;
            var subtotalLibros = 0;
            if(!libros) libros = [];
            libros.forEach(libro => {
                const { Id_Libro, Precio } = libro;
                subtotalLibros += Math.round((carritoLibros[Id_Libro] * Precio) * 100) / 100;
            });
            carritoModel.carritoRemates(idsRemates, (err, rows) => {
                var remates = rows;
                var subtotalRemates = 0;
                if(!remates) remates = [];
                remates.forEach(remate => {
                    const { Id_Remate, Precio } = remate;
                    subtotalRemates += Math.round((carritoRemates[Id_Remate] * Precio) * 100) / 100;
                });
                carritoModel.carritoTecnologia(idsTecnologia, (err, rows) => {
                    var tecnologia = rows;
                    var subtotalTecnologia = 0;
                    if(!tecnologia) tecnologia = [];
                    tecnologia.forEach(tec => {
                        const { Id_Tecnologia, Precio } = tec;
                        subtotalTecnologia += Math.round((carritoTecnologia[Id_Tecnologia] * Precio) * 100) / 100;
                    });
                    var total = req.session.total = subtotalLibros + subtotalRemates + subtotalTecnologia;
                    console.log(carritoTecnologia);
                    res.render('carrito', { style: "carrito.css", libros, remates, tecnologia, carritoLibros, carritoRemates, carritoTecnologia, total, carrito });
                });
            });
        });
    } else res.render("carrito", { style: "carrito.css"});
};
carritoController.limpiar = (req, res) => {
    req.session.carrito = {};
    req.session.total = 0;
    req.flash('exito', 'Carrito vaciado');
    res.redirect('/carrito');
};
carritoController.agregarLibroACarrito = (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carritoLibros = carrito['carrito_libros'];
    if(!carritoLibros){
        carritoLibros = req.session.carrito['carrito_libros'] = {};   
    }
    var carritoRemates = carrito['carrito_remates'];
    if(!carritoRemates){
        carritoRemates = req.session.carrito['carrito_remates'] = {};   
    }
    var carritoTecnologia = carrito['carrito_tecnologia'];
    if(!carritoTecnologia){
        carritoTecnologia = req.session.carrito['carrito_tecnologia'] = {};   
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito['carrito_libros'][id] = (carrito['carrito_libros'][id] || 0) + cantidad;
    req.flash('exito', 'Libro agregado correctamente');
    res.redirect('back');
};
carritoController.agregarRemateACarrito = (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carritoLibros = carrito['carrito_libros'];
    if(!carritoLibros){
        carritoLibros = req.session.carrito['carrito_libros'] = {};   
    }
    var carritoRemates = carrito['carrito_remates'];
    if(!carritoRemates){
        carritoRemates = req.session.carrito['carrito_remates'] = {};   
    }
    var carritoTecnologia = carrito['carrito_tecnologia'];
    if(!carritoTecnologia){
        carritoTecnologia = req.session.carrito['carrito_tecnologia'] = {};   
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito['carrito_remates'][id] = (carrito['carrito_remates'][id] || 0) + cantidad;
    req.flash('exito', 'Remate agregado correctamente');
    res.redirect('back');
};
carritoController.agregarProductoACarrito = (req, res) => {
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carrito = req.session.carrito;
    if (!carrito) {
        carrito = req.session.carrito = {};
    }
    var carritoLibros = carrito['carrito_libros'];
    if(!carritoLibros){
        carritoLibros = req.session.carrito['carrito_libros'] = {};   
    }
    var carritoRemates = carrito['carrito_remates'];
    if(!carritoRemates){
        carritoRemates = req.session.carrito['carrito_remates'] = {};   
    }
    var carritoTecnologia = carrito['carrito_tecnologia'];
    if(!carritoTecnologia){
        carritoTecnologia = req.session.carrito['carrito_tecnologia'] = {};   
    }
    var id = req.body.id;
    var cantidad = parseInt(req.body.cantidad, 10);
    carrito['carrito_tecnologia'][id] = (carrito['carrito_tecnologia'][id] || 0) + cantidad;
    req.flash('exito', 'Producto agregado correctamente');
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