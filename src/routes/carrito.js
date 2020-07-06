const express = require('express');
const router = express.Router();
const helper = require("../lib/helpers");
const carritoController = require('../controllers/carritoController');
router.get("/carrito/limpiar", carritoController.limpiar);
router.get("/carrito", carritoController.carrito);
router.post("/agregar_a_carrito", carritoController.agregarACarrito);
router.get("/carrito/comprar", helper.isLogged, carritoController.compras);
router.post("/carrito/comprar", carritoController.comprar);
module.exports = router;
