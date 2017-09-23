const path = require('path');

var teacherRoutes = (app) => {
    app.get('/teacher', (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });
};

module.exports = teacherRoutes;
