const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../db');
const helper = require('../lib/helpers');

passport.use('local.iniciar', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, Username, Password, done) => {
    const { username, password } = req.body;
    const results = await pool.query('SELECT * FROM Clientes WHERE Username = ?', [username]);
    if(results.length > 0){
        const user = results[0];
        const flag = await helper.matchPassword(password, user.Password);
        if(flag){
            done(null, user);
        }else done(null, false, req.flash('error', "Contraseña incorrecta"));
    }else return done(null, false, req.flash('error', 'No existe el nombre de usuario'));
}));

passport.use('local.registrar', new strategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Username, Password, done) => {
    const { Nombre, ApellidoP, ApellidoM, Correo, Direccion, CodigoPostal } = req.body;
    let newuser = {
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
    try {
        const result = await pool.query("INSERT INTO Clientes SET ?", [newuser]);
        newuser.id = result.insertId;
        return done(null, newuser);        
    } catch (error) {
        done(null, false, req.flash('error', 'Usuario o correo ya utilizados'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await pool.query("SELECT * FROM Clientes WHERE id = ?", [id]);
    done(null, user[0]);
});
