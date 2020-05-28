const express = require('express');
const router = express.Router();
const pool = require('../db');
const passport = require('passport');

router.get("/registrar", (req, res) => {
    res.render("registrar", {style: "registrar.css"});
});
router.post("/registrar", passport.authenticate('local.registrar', {
    successRedirect: '/',
    failureRedirect: '/registrar',
    failureFlash: true
}));
router.post("/login", (req, res, next) => {
    passport.authenticate('local.iniciar',{
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
module.exports = router;