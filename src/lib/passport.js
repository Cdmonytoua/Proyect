const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../db');
const helper = require('../lib/helpers');
passport.use('local.registrar', new strategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Username, Password, done) => {
    const { Nombre, ApellidoP, ApellidoM, Correo, Direccion, CodigoPostal } = req.body;
    const newuser = {
        Username,
        Nombre,
        ApellidoP,
        ApellidoM,
        Correo,
        Password,
        Direccion,
        CodigoPostal
    };
    newuser.Password = await helper.encryptPassword(Password);
    await pool.query("INSERT INTO Clientes SET ?", [newuser]);
}));
/*
passport.serializeUser((user, done) => {

});
*/