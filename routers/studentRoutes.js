const path = require('path');

var studentRoutes = (app) => {
    app.get('/student', (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });
};

module.exports = studentRoutes;
