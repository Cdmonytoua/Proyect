const pool = require('../db');
const { search } = require('../routes');
var mainModel = function () { };
mainModel.libros = (limit, offset) => {
    return pool.query("SELECT * FROM libros LIMIT " + limit + " OFFSET " + offset);
};
mainModel.cantidadDeLibros = () => {
    return pool.query("SELECT COUNT(*) as cantidad FROM libros");
};
mainModel.pagCategorias = (id, limit, offset) => {
    return pool.query("SELECT * FROM libros WHERE categoria = " + id + " LIMIT " + limit + " OFFSET " + offset);
};
mainModel.pagAutores = (id, limit, offset) => {
    return pool.query("SELECT * FROM libros WHERE autor = " + id + " LIMIT " + limit + " OFFSET " + offset);
};
mainModel.pagEditorial = (id, limit, offset) => {
    return pool.query("SELECT * FROM libros WHERE editorial = " + id + " LIMIT " + limit + " OFFSET " + offset);
};
mainModel.pagBusqueda = async (substr, limit, offset) => {
    return pool.query('SELECT * FROM libros WHERE nombre LIKE "' + substr + '" LIMIT ' + limit + ' OFFSET ' + offset);
};
mainModel.librosPorIDCategoria = async (id, result) => {
    await pool.query('SELECT * FROM libros WHERE categoria = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosPorIDAutor = async (id, result) => {
    await pool.query('SELECT * FROM libros WHERE autor = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosPorIDEditorial = async (id, result) => {
    await pool.query('SELECT * FROM libros WHERE editorial = ?', id, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.librosBusqueda = async (substr, result) => {
    await pool.query('SELECT * FROM libros WHERE nombre LIKE ?', substr, (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.remates = async (result) => {
    await pool.query("SELECT * FROM remates", (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.tecnologia = async (result) => {
    await pool.query("SELECT * FROM tecnologia", (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.novedades = async (result) => {
    await pool.query("SELECT * FROM libros ORDER BY Id_Libro DESC LIMIT 12", (err, rows, field) => {
        return result(err, rows);
    });
};
mainModel.libro = async (id, result) => {
    await pool.query("SELECT * FROM libros WHERE Id_Libro = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
}
module.exports = mainModel;