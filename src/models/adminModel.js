const pool = require('../db');
var adminModel = function () { };
adminModel.categorias = () => {
    return pool.query("SELECT * FROM Categorias");
};
adminModel.editoriales = () => {
    return pool.query("SELECT * FROM Editoriales");
};
adminModel.autores = () => {
    return pool.query("SELECT * FROM Autores");
};
adminModel.insertarLibro = async (libro, result) => {
    await pool.query("INSERT INTO Libros SET ?", libro, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarCategoria = async (categoria, result) => {
    await pool.query("INSERT INTO Categorias SET ?", categoria, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarEditorial = async (editorial, result) => {
    await pool.query("INSERT INTO Editoriales SET ?", editorial, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.insertarAutor = async (autor, result) => {
    await pool.query("INSERT INTO Autores SET ?", autor, (err, rows, field) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, err);
        }
    });
};
adminModel.eliminarCategoria = async (id, result) => {
    await pool.query("DELETE FROM Categorias WHERE Id_Categoria = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
adminModel.eliminarEditorial = async (id, result) => {
    await pool.query("DELETE FROM Editoriales WHERE Id_Editorial = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
adminModel.eliminarAutor = async (id, result) => {
    await pool.query("DELETE FROM Autores WHERE Id_Autor = ?", id, (err, rows, field) => {
        return result(err, rows);
    });
};
module.exports = adminModel;
