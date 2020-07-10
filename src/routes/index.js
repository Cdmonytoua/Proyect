const express = require('express');
const router = express.Router();
const pool = require('../db');
const helper = require("../lib/helpers");
var mainController = require("../controllers/mainController");
router.get("/", mainController.inicio);
router.get("/libros", mainController.libros);
router.get("/categorias", mainController.categorias);
router.get("/categorias/:id", mainController.librosPorIDCategoria);
router.get("/autores", mainController.autores);
router.get("/autores/:id", mainController.librosPorIDAutor);
router.get("/editoriales", mainController.editoriales);
router.get("/editoriales/:id", mainController.librosPorIDEditorial);
router.post("/buscar", mainController.buscar);
router.get("/buscar/:title", mainController.librosBusqueda);
module.exports = router;

