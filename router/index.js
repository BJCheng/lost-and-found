var dashboardRouter = require('./dashboard');
var loginRouter = require('./login');
var registerRouter = require('./register');
var logoutRouter = require('./logout');
var homeRouter = require('./home');
var mapRouter = require('./map');
var foundRouter = require('./found');
var lostRouter = require('./lost');

let configRoutes = (app) => {
    app.use('/', homeRouter);
    app.use('/home', homeRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/logout', logoutRouter);
    app.use('/map', mapRouter);
    app.use('/found', foundRouter);
    app.use('/lost', lostRouter);
}

module.exports = configRoutes;

//Po-Hsun Added Comment
//Po-Hsun Added Comment 2

//Po-Hsun Added Comment for null branch 3
//Po-Hsun Added Comment for index change testing
