const path = require('path');
const dbHashing = require('../database/hashing');


var loggedOutRoutes = (app) => {



    app.get('/', (req, res) => {

        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });


    app.post('/student/register', (req, res) => {
        console.log('student server post');
        const {first, last, email, password, course} = req.body;


        if(first && last && email && password && course) {

            console.log("success")
            console.log(first, last);

            dbHashing.hashPassword(password)
            .then((hash) => {

                return dbHashing.addStudent(first, last, email, hash, course)

                .then((result) => {
                    console.log('studet', result);

                    res.json({
                        success: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

            })
            .catch((err) => {
                console.log(err);
            })

        }
    });


    app.post('/teacher/register', (req, res) => {
        console.log('teacher server post');

        const {first, last, email, password, course} = req.body;

        //unless we make two different app.post depending on if teacher or student

        if(first && last && email && password) {

            dbHashing.hashPassword(password)
            .then((hash) => {
                console.log('adding user to DB', hash);
                return dbHashing.addTeacher(first, last, email, hash)
                .then((result) => {
                        console.log('teacher', result);

                    res.json({
                        success: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

            })
            .catch((err) => {
                console.log(err);
            })

        }
    })

    app.post('/login', (req, res) => {
        const{email, password} = req.body;

        dbHashing.getUserByEmail(email)
        .then((result) => {
            dbHashing.checkPassword(password, result.rows[0].password)
            .then((doesMatch) => {
                if(!doesMatch) {
                    throw 'Password is incorrect.'
                } else {
                    const {id, first, last, email, course, role} = result.rows[0];

                    req.session.user = {
                        id, first, last, email, couse, role
                    }

                    res.json({
                        success: true
                    })
                }

            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    })
};





module.exports = loggedOutRoutes;
