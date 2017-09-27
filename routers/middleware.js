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
        console.log('user is logged in sending to next');
        
        next();
    } else {
        res.redirect('/');
    }
}

//add student check and teacher check.

module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck;
