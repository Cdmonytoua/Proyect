const pool = require('../db');
var carritoModel = function () { };

carritoModel.carrito = async (ids, result) => {
    await pool.query('SELECT * FROM Libros WHERE Id_Libro IN (' + ids + ')', (err, rows, field) => {
        if(err){
            return result(err, rows);
        }
        return result(err, rows);
    });
};

module.exports = carritoModel;