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
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new mysqlsession(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
});
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url, layout: false});
      return;
    }
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(app.get('port'), () => {
    console.log("Listen");
});