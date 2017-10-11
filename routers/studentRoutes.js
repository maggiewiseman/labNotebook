const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');



var studentRoutes = (app) => {

    app.get('/student',  mw.loggedInCheck, mw.checkIfStudent,  (req, res) => {

        return res.sendFile( path.join( __dirname, '../index.html' ));
    });


    app.get('/api/student/data',  mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

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

    app.post('/api/student/class',  mw.loggedInCheck, mw.checkIfStudent, (req, res) => {

        const{id} = req.session.user;
        const{classID} = req.body;

        dbStudent.checkStudentClasses(id)
        .then((result) => {
            console.log(result.rows);

            if(result.rows.find(section => section.section_id == classID)) {
                throw 'Error student is already enrolled in this class'
            } else {
                dbStudent.addNewClass(id, classID)
                .then((result) => {
                    console.log('add new class get section id', result.rows[0]);
                    const sectionID = result.rows[0].section_id
                    return dbStudent.getAssignmentsPerSection(sectionID)

                })
                .then((result) => {
                    console.log('assignment list', result.rows);
                    //const sectionID = result.rows[0].section_id
                    const assignmentIDList = result.rows.map((assignment) => {
                        return assignment.id
                    })
                    assignmentIDList.forEach((assignment) => {
                        console.log(assignment);
                        dbStudent.addStudentsReports(id, classID, assignment);

                    })
                })
                .then(() => {

                    return dbStudent.updateClassList(id);

                })
                .then((result) => {
                    console.log('update class list', result.rows);

                    const courses = result.rows.map((obj) => {
                        var course = {
                            course_id: obj.course_id,
                            course_name: obj.course_name,
                            section_id: obj.section_id

                        }
                        return course;
                    });

                    return courses

                })
                .then((courses) => {

                    dbStudent.getAssignmentList(id)
                    .then((result) => {

                        courses.forEach(course => {
                            course.assignments = result.rows.filter(ass => ass.section_id == course.section_id);
                        });


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
            }
        })
    });


    app.get('/api/student/assignment/:id',  mw.loggedInCheck, mw.checkIfStudent, (req, res) => {
        const assignmentID = req.params.id;
        const userID = req.session.user.id;

        dbStudent.getReportByID(userID, assignmentID)
        .then((result) => {
            console.log(result.rows[0]);
            const reportID = result.rows[0].id;
            return dbStudent.getAssignment(reportID, assignmentID)
        })
        .then((result) => {
            console.log('assignment', result.rows[0]);

            const {assignment_id, status, report_comments,
            report_grade, title_editable, title_content, title_comments, title_grade, question_editable, question_content, question_comments, question_grade, abstract_editable, abstract_content, abstract_comments, abstract_grade, hypothesis_editable, hypothesis_content, hypothesis_comments, hypothesis_grade, variable_editable, variable_content, variable_comments , variable_grade, material_editable, material_content, material_comments, material_grade, procedure_editable, procedure_content, procedure_comments, procedure_grade, data_editable, data_content, data_comments, data_grade, calculation_editable, calculation_content, calculation_comments, calculation_grade, discussion_editable, discussion_content, discussion_comments, discussion_grade} = result.rows[0];



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
                    assignment_id, status, report_comments,
                    report_grade, title, question, abstract, hypothesis, variable, material, procedure, data, calculation, discussion
                }
            });

        })

    })

    //after updating. either do another query to get all rows again orrrrr write if clauses in reducer to update the state. another issue is when you save to locak state it adds on to the list of this.state.

    app.post('/api/student/save-assignment',  mw.loggedInCheck, mw.checkIfStudent, (req, res) => {
        const assignmentID = req.body.id;
        const {part} = req.body;
        const {id}= req.session.user;
        console.log(id, assignmentID);

        dbStudent.getAssignmentStatus(id, assignmentID)
        .then((result) => {
            const status=result.rows[0].status;

            if(status === null) {
                dbStudent.updateAssignmentStatus(id, assignmentID, 'IN PROGRESS')
                .then((result) => {
                    console.log('in progress', result);
                })
            }

            for(var prop in part) {
                if(prop==='title') {
                    dbStudent.updateTitles(id, assignmentID, part[prop]).then((result) => {
                        const title = result.rows[0].content;
                        res.json({
                            success: true

                        })
                    })
                }
                if(prop==='question') {
                    dbStudent.updateQuestions(id, assignmentID, part[prop]).then((result) => {
                        const question = result.rows[0].content;
                        res.json({
                            success: true

                        })
                    })
                }
                if(prop==='abstract') {
                    dbStudent.updateAbstracts(id, assignmentID, part[prop]).then((result) => {
                        const abstract= result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='hypothesis') {
                    dbStudent.updateHypotheses(id, assignmentID, part[prop]).then((result) => {
                        console.log(result);
                        const hypothesis = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='variable') {
                    dbStudent.updateVariables(id, assignmentID, part[prop]).then((result) => {
                        return {
                            variable: result.rows[0].content
                        }
                    })
                }
                if(prop==='material') {
                    dbStudent.updateMaterials(id, assignmentID, part[prop]).then((result) => {
                        const material = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='procedure') {
                    dbStudent.updateProcedures(id, assignmentID, part[prop]).then((result) => {
                        const procedure = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='data') {
                    dbStudent.updateData(id, assignmentID, part[prop]).then((result) => {
                        const data = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='calculation') {
                    dbStudent.updateCalculations(id, assignmentID, part[prop]).then((result) => {
                        const calculation = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
                if(prop==='discussion') {
                    dbStudent.updateDiscussions(id, assignmentID, part[prop]).then((result) => {
                        const discussion = result.rows[0].content;
                        res.json({
                            success: true
                        })
                    })
                }
            }
        });

    })

    app.post('/api/student/commit-assignment/',  mw.loggedInCheck, mw.checkIfStudent, (req, res) => {
        console.log('server committing');

        const assignmentID = req.body.id;
        const {part} = req.body;
        const {id}= req.session.user;

        dbStudent.updateAssignmentStatus(id, assignmentID, 'COMMITTED')
        .then((result) => {
            console.log('committed', result);

                res.redirect('/api/student/assignment/'+assignmentID);
            })
    })



};

module.exports = studentRoutes;
