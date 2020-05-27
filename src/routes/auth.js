const express = require('express');
const router = express.Router();
const pool = require('../db');
const passport = require('passport');
router.get("/login", (req, res) => {
    res.render("login", {style: "login.css"});
});
router.get("/registrar", (req, res) => {
    res.render("registrar", {style: "login.css"});
});
router.post("/registrar", passport.authenticate('local.registrar', {
    successRedirect: '/',
    failureRedirect: '/registrar',
    failureFlash: true
}));
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    await pool.query('SELECt * FROM Clientes WHERE Username = ? and Password = ?', [username, password], (err, results, fields) => {
        if(results.length > 0){
            req.flash('islogged', username);
            res.redirect('/');
        }else{
            res.redirect("/login");      
        }
    })
});
module.exports = router;