const pool = require('../db');
var carritoModel = function () { };

carritoModel.carrito = async (ids, result) => {
    console.log(ids);
    await pool.query('SELECT * FROM libros WHERE Id_Libro IN (' + ids + ')', (err, rows, field) => {
        if(err){
            return result(err, rows);
        }
        return result(err, rows);
    });
};

module.exports = carritoModel;