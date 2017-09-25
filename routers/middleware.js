function registerLoginCheck(req, res, next) {

    if(req.session.user) {
        //logged in
        if(req.session.user.role == 'teacher') {
            res.redirect('/teacher');
        } else {
            res.redirect('/student');
        }
    } else {
        //not logged in go to registration page
        next();
    }
}
function loggedInCheck(req, res, next) {
    if(req.session.user) {
        //logged in!
        next();
    } else {
        res.redirect('/');
    }
}

module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck;
