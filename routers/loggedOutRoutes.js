const path = require('path');

var loggedOutRoutes = (app) => {

    app.get('/', (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });
};

module.exports = loggedOutRoutes;
