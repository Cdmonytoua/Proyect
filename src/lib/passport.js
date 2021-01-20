const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../db');
const helper = require('../lib/helpers');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
passport.use('local.iniciar', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, done) => {
    const { username, password } = req.body;
    const results = await pool.query('SELECT * FROM clientes WHERE Username = ?', [username]);
    if (results.length > 0) {
        const user = results[0];
        const flag = await helper.matchPassword(password, user.Password);
        if (flag) {
            done(null, user);
        } else done(null, false, req.flash('error', "Contraseña incorrecta"));
    } else return done(null, false, req.flash('error', 'No existe el nombre de usuario'));
}));

passport.use('local.registrar', new strategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
}, async (req, Username, Password, done) => {
    const { Nombre, ApellidoP, ApellidoM, Correo, Direccion, CodigoPostal } = req.body;
    let Rol = "usuario";
    let newuser = {
        Username,
        Nombre,
        ApellidoP,
        ApellidoM,
        Correo,
        Password,
        Direccion,
        CodigoPostal,
        Rol
    };
    newuser.Password = await helper.encryptPassword(Password);
    try {
        const result = await pool.query("INSERT INTO clientes SET ?", [newuser]);
        newuser.id = result.insertId;
        return done(null, newuser);
    } catch (error) {
        done(null, false, req.flash('error', 'Usuario o correo ya utilizados'));
    }
}));
passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name']

}, async (accessToken, refreshToken, profile, done) => {
    await pool.query("SELECT * FROM clientes WHERE Correo = ?", [profile.emails[0].value], async (err, user) => {
        if (err) {
            return done(err);
        }
        else if (user.length == 0) {
            var Nombre = profile.name.givenName;
            var ApellidoP = profile.name.familyName;
            var ApellidoM = profile.name.middleName == null ? "" : profile.name.middleName;
            var Correo = profile.emails[0].value;
            var Username = profile.username == null ? "" : profile.username;
            var Direccion = "";
            var Password = "";
            var CodigoPostal = 1;
            var id = profile.id;
            var Rol = "usuario";
            let newuser = {
                Username,
                Nombre,
                ApellidoP,
                ApellidoM,
                Correo,
                Password,
                Direccion,
                CodigoPostal,
                Rol,
                id
            };
            await pool.query("INSERT INTO clientes SET ?", [newuser]);
            return done(null, user);
        }
        else {
            return done(null, user);
        }

    });
}
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
    done(null, user[0]);
});
