const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlsession = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');
require('./lib/passport');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine(".hbs", hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'mysession',
    resave: 'false',
    saveUninitialized: 'false',
    store: new mysqlsession(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.islogged = req.flash('islogged')
    next();
});
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log("Listen");
});