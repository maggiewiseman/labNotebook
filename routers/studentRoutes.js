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

            console.log('HERE', courses);
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


    app.get('/api/student/assignment/:id', (req, res) => {
        const paramsID = req.params.id;
        const userID = req.session.user.id;


        console.log(userID, paramsID);


        dbStudent.getAssignment(userID, paramsID)
        .then((result) => {
            console.log('assignment', result.rows);

            const {title_editable, title_content, title_comments, title_grade, question_editable, question_content, question_comments, question_grade, abstract_editable, abstract_content, abstract_comments, abstract_grade, hypothesis_editable, hypothesis_content, hypothesis_comments, hypothesis_grade, variable_editable, variable_content, variable_comments , variable_grade, material_editable, material_content, material_comments, material_grade, procedure_editable, procedure_content, procedure_comments, procedure_grade, data_editable, data_content, data_comments, data_grade, calculation_editable, calculation_content, calculation_comments, calculation_grade, discussion_editable, discussion_content, discussion_comments, discussion_grade} = result.rows[0];



            const title = {
                title_editable, title_content, title_comments, title_grade
            }

            const question = {
                question_editable, question_content, question_comments, question_grade
            }

            const abstract = {
                abstract_editable, abstract_content, abstract_comments, abstract_grade
            }

            const hypothesis = {
                hypothesis_editable, hypothesis_content, hypothesis_comments, hypothesis_grade
            }

            const variable = {
                variable_editable, variable_content, variable_comments, variable_grade
            }

            const material = {
                material_editable, material_content, material_comments, material_grade
            }

            const procedure = {
                procedure_editable, procedure_content, procedure_comments, procedure_grade
            }

            const data = {
                data_editable, data_content, data_comments, data_grade
            }

            const calculation = {
                calculation_editable, calculation_content, calculation_comments, calculation_grade
            }

            const discussion = {
                discussion_editable, discussion_content, discussion_comments, discussion_grade
            }

            res.json({
                success: true,
                assignment: {
                    title, question, abstract, hypothesis, variable, material, procedure, data, calculation, discussion
                }
            });

        })

    })





};

module.exports = studentRoutes;
