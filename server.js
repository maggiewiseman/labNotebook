const express = require('express');
const app = express();
const path = require('path');

//middleware modules
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const mw = require('./routers/middleware');

//route modules
const loggedOutRoutes = require("./routers/loggedOutRoutes.js");
const studentRoutes = require("./routers/studentRoutes.js");
const teacherRoutes = require("./routers/teacherRoutes.js");
const teacherGradingRoutes = require("./routers/teacherGrading.js");


/* Start bundle-server.js in terminal to have webpack compile bundle.js
    Then start server.js in another terminal which will get bundle.js from the proxy.s
*/
if (process.env.NODE_ENV != 'production') {
    // app.use(require('./build'));
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081'
    }));
} else {
    app.use(require('./build'));
}

var secret = process.env.SESSION_SECRET || require('./secrets.json').sessionSecret;

//use middleware here
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieSession({
    name: 'session',
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

//csurf check
// app.use(csurf());
// app.use(function(req, res, next) {
//     res.cookie('north_Shore__Wave___Rider', req.csrfToken());
//     next();
// });

//get static files from public directory
app.use(express.static('./public'));

loggedOutRoutes(app);
studentRoutes(app);
teacherRoutes(app);
teacherGradingRoutes(app);

app.get('*', mw.loggedInCheck, function(req, res) {
    console.log('file not found');
    return res.sendFile( path.join( __dirname, './index.html' ) );
});

app.listen(process.env.PORT || 8080, ()=> {
    console.log('Listening on port 8080');
});
