const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');


var studentRoutes = (app) => {

    app.get('/student', (req, res) => {

        console.log(req.session.user.email);
        return res.sendFile( path.join( __dirname, '../index.html' ));
    });


    app.get('/api/student/data', (req, res) => {

        const {id, first_name, last_name, email, role} = req.session.user;

        dbStudent.getStudentData(email)
        .then((result) => {
            console.log('STUDENT DATA', result);

            const rows = result.rows;

            const courses = rows.map((obj) => {
                var courseName = {
                    name: obj.name
                }

            return courseName;
            });

            console.log(courses);

            const {id, first_name, last_name, user_id} = result.rows[0];

            var studentData = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                user_id: user_id,
                courses: courses
            }

            res.json({
                success: true,
                studentData: studentData
            })
        

        })
        .catch((err) => {
            console.log(err);
        });
    })





};

module.exports = studentRoutes;
