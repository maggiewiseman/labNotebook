const path = require('path');
const dbHashing = require('../database/hashing');

var loggedOutRoutes = (app) => {



    app.get('/', (req, res) => {

        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    // app.get('/register', (req, res) => {
    //     if(!req.session.user) {
    //         res.sendFile(__dirname + '../index.html');
    //     }
    // })


    app.post('/student/register', (req, res) => {

        const {first, last, email, password, course} = req.body;

        //unless we make two different app.post depending on if teacher or student

        if(first && last && email && password && course) {

            dbHashing.hashPassword(password).then((hashedPassword) => {
                console.log('adding user to DB', hashedPassword);
                dbHashing.addUser(first, last, email, hashedPassword, course, 'student');

            })
            .then((result) => {

                const {id, first, last, email, role} = result.rows[0];

                req.session.user = {
                    id, first, last, email, role
                }

                res.json({
                    success: true
                });
            })
            .catch((err) => {
                console.log(err);
            })
        }
    });


    app.post('/teacher/register', (req, res) => {

        const {first, last, email, password, course} = req.body;

        //unless we make two different app.post depending on if teacher or student

        if(first && last && email && password) {

            dbHashing.hashPassword(password).then((hashedPassword) => {
                console.log('adding user to DB', hashedPassword);
                dbHashing.addUser(first, last, email, hashedPassword, course, 'teacher');

            })
            .then((result) => {

                const {id, first, last, email, role} = result.rows[0];

                req.session.user = {
                    id, first, last, email, role
                }

                res.json({
                    success: true
                });
            })
            .catch((err) => {
                console.log(err);
            })
        }
    })
};




module.exports = loggedOutRoutes;
