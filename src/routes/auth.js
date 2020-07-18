const express = require('express');
const router = express.Router();
const pool = require('../db');
const passport = require('passport');
const helper = require("../lib/helpers");
router.get("/registrar", helper.isnotLogged, (req, res) => {
    res.render("registrar", {style: "registrar.css"});
});
router.get("/micuenta", helper.isLogged, async (req, res) => {
    const users = await pool.query("SELECT * FROM clientes WHERE id = ?", [req.user.id]);
    const user = users[0];
    res.render("micuenta", {bootstrap: true, user});
});
router.post("/micuenta/actualizar", async(req, res) => {
    var { CodigoPostal, Nombre, Password, Direccion, Correo, ApellidoM, ApellidoP } = req.body;
    Password = await helper.encryptPassword(Password);
    const sql = `UPDATE clientes set CodigoPostal = "${CodigoPostal}", Nombre = "${Nombre}", Password = "${Password}", Direccion = "${Direccion}",
    Correo = "${Correo}", ApellidoM = "${ApellidoM}", ApellidoP = "${ApellidoP}" WHERE id = ${req.user.id}`;
    await pool.query(sql, (err, rows) => {
        if(err) req.flash('error', 'Ocurrió un error');
        else req.flash('exito', 'Operación exitosa');
        res.redirect("/micuenta");
    });
});
router.get("/salir", helper.isLogged, (req, res) => {
    req.logOut();
    res.redirect('back');
});
router.post("/registrar", passport.authenticate('local.registrar', {
    successRedirect: '/',
    failureRedirect: '/registrar',
    failureFlash: true
}));
router.post("/login", (req, res, next) => {
    passport.authenticate('local.iniciar', {
        successRedirect: 'back',
        failureRedirect: 'back',
        failureFlash: true
    })(req, res, next);
});
module.exports = router;