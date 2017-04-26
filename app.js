var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var static = express.static('public');

var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

// view engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// middlewares
app.use('/public', static);
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'lostAndFoundSecrest',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global var
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.err_msg = req.flash('err_msg');
    res.locals.msg = req.flash('msg');
    next();
});

//config routes
var configRoutes = require('./router');
configRoutes(app);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log('server listening at port ' + app.get('port'));
});