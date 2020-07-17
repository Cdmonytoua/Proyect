const pool = require('../db');
var adminModel = function () { };
adminModel.categorias = () => {
    return pool.query("SELECT * FROM categorias");
};
adminModel.editoriales = () => {
    return pool.query("SELECT * FROM editoriales");
};
adminModel.autores = () => {
    return pool.query("SELECT * FROM autores");
};
adminModel.insertarLibro = async (libro, result) => {
    await pool.query("INSERT INTO libros SET ?", libro, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarCategoria = async (categoria, result) => {
    await pool.query("INSERT INTO categorias SET ?", categoria, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarEditorial = async (editorial, result) => {
    await pool.query("INSERT INTO editoriales SET ?", editorial, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarAutor = async (autor, result) => {
    await pool.query("INSERT INTO autores SET ?", autor, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.eliminarCategoria = async (id, result) => {
    await pool.query("DELETE FROM categorias WHERE Id_Categoria = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
adminModel.eliminarEditorial = async (id, result) => {
    await pool.query("DELETE FROM editoriales WHERE Id_Editorial = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
adminModel.eliminarAutor = async (id, result) => {
    await pool.query("DELETE FROM autores WHERE Id_Autor = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
module.exports = adminModel;
