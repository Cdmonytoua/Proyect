const passport = require('passport');
const strategy = require('passport-local').Strategy;
passport.use('local.registrar', new strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
}));
/*
passport.serializeUser((user, done) => {

});
*/