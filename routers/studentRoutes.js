const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');



var studentRoutes = (app) => {

    app.get('/student',  mw.loggedInCheck, (req, res) => {

        return res.sendFile( path.join( __dirname, '../index.html' ));
    });


    app.get('/api/student/data', (req, res) => {

        const {id, first_name, last_name, email, role} = req.session.user;



        dbStudent.getStudentData(email)
        .then((result) => {

            console.log('getting student data', result.rows);
            const rows = result.rows;

            const courses = rows.map((obj) => {
                var course = {
                    course_id: obj.course_id,
                    course_name: obj.course_name,
                    section_id: obj.section_id

                }
            return course;
            });



            const {id, first_name, last_name, user_id} = result.rows[0];

            const studentData = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                user_id: user_id
            }

            const info = {
                studentData,
                courses
            }
            return info

        }).then((studentInfo) => {

                dbStudent.getAssignmentList(id).then((result) => {

                    studentInfo.courses.forEach(course => {
                        course.assignments = result.rows.filter(ass => ass.section_id == course.section_id);
                    });


                    res.json({
                        success: true,
                        studentInfo: studentInfo
                    })

            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.post('/api/student/class', (req, res) => {

        const{id} = req.session.user;
        const{classID} = req.body;


        console.log('course', req.body.classID)

        dbStudent.addNewClass(id, classID).then((result) => {
            console.log('addNewClass post', result);
            const {section_id} = result.rows[0]
            console.log(section_id);

            dbStudent.updateClassList(id)
            .then((result) => {

            const courses = result.rows.map((obj) => {
                var course = {
                    course_name: obj.course_name,
                    course_id: obj.course_id,
                    section_id: obj.section_id
                }
                return course;
            })

            res.json({
                success: true,
                courses: courses
            })
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        })

    });


    app.post('/api/student/assignments', (req, res) => {
        const{id} = req.session.user;

        dbStudent.getAssignmentList(id).then((result) => {
            console.log('get ass list', result.rows);

            res.json({
                success: true,
                assignments: result.rows
            });

        })

    })





};

module.exports = studentRoutes;
