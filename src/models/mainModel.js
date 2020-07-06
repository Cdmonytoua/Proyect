const pool = require('../db');
const { search } = require('../routes');
var mainModel = function () { };
mainModel.libros = () => {
    return pool.query("SELECT * FROM Libros");
};
mainModel.librosPorIDCategoria = async (id, result) => {
    await pool.query('SELECT * FROM Libros WHERE Categoria = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosPorIDAutor = async (id, result) => {
    await pool.query('SELECT * FROM Libros WHERE Autor = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosPorIDEditorial = async (id, result) => {
    await pool.query('SELECT * FROM Libros WHERE Editorial = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosBusqueda = async (substr, result) => {
    await pool.query('SELECT * FROM Libros WHERE Nombre LIKE ?', substr, (err, rows, field) => {
        return result(err, rows);
    });
}
module.exports = mainModel;