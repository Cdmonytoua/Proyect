const { carrito } = require('../controllers/carritoController');
const pool = require('../db');
var carritoModel = function () { };

carritoModel.carritoLibros = async (ids, result) => {
    await pool.query('SELECT * FROM libros WHERE Id_Libro IN (' + ids + ')', (err, rows, field) => {
        if (err) {
            return result(err, rows);
        }
        return result(err, rows);
    });
};
carritoModel.carritoRemates = async (ids, result) => {
    await pool.query('SELECT * FROM remates WHERE Id_Remate IN (' + ids + ')', (err, rows, field) => {
        if (err) {
            return result(err, rows);
        }
        return result(err, rows);
    });
};
carritoModel.carritoTecnologia = async (ids, result) => {
    await pool.query('SELECT * FROM tecnologia WHERE Id_Tecnologia IN (' + ids + ')', (err, rows, field) => {
        if (err) {
            return result(err, rows);
        }
        return result(err, rows);
    });
};
carritoModel.precioLibro = async (id) => {
    return await pool.query("SELECT Precio FROM libros WHERE Id_Libro = ?", id);
};
module.exports = carritoModel;