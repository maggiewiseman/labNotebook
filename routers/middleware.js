function registerLoginCheck(req, res, next) {

    if(req.session.user) {
        //logged in
        console.log('REGISTER LOGIN CHECK', req.session);
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
        console.log('Logged in check:', req.session);
        console.log('user is logged in sending to next');

        next();
    } else {
        res.redirect('/');
    }
}

//add student check and teacher check.
function checkIfTeacher(req, res, next) {
    console.log('checking if teacher');
    if(req.session.user.role == 'teacher'){
        next();
    } else {
        console.log('user is not teacher, routing to student')
        res.redirect('/student');
    }
}

function checkIfStudent(req, res, next) {
    console.log('checking if student');

    if(req.session.user.role == 'student'){
        next();
    } else {
        console.log('user is not student, routing to teacher')
        res.redirect('/teacher');
    }
}

module.exports.checkIfTeacher = checkIfTeacher;
module.exports.checkIfStudent = checkIfStudent;
module.exports.loggedInCheck = loggedInCheck;
module.exports.registerLoginCheck = registerLoginCheck;
