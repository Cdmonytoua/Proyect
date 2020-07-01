const express = require('express');
const router = express.Router();
const pool = require('../db');
const passport = require('passport');
const helper = require("../lib/helpers");
router.get("/registrar", helper.isnotLogged, (req, res) => {
    res.render("registrar", {style: "registrar.css"});
});
router.get("/micuenta", helper.isLogged, (req, res) => {
    res.render("micuenta", {bootstrap: true});
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