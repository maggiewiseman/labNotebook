
var loggedOutRoutes = (app) => {
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });
};

module.exports.loggedOutRoutes = loggedOutRoutes;
