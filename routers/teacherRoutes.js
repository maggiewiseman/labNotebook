const path = require('path');
const mw = require('./middleware');

const {saveNewCourse, getCoursesByTeacher, deleteCourse, getAllSections, getSectionsByCourseId, saveNewSection, getStudentIdsBySectionId, getTeacherInfoById} = require("../database/teacherDb");

const {saveNewAssignmentTemplate, saveNewStudentReport, newTitle, newQuestion, newAbstract, newHypothesis, newVariables, newMaterials, newProcedure, newData, newCalculations, newDiscussion, getAssignmentNameIdBySection} = require("../database/assignmentsDb")

var teacherRoutes = (app) => {
    app.get('/teacher', mw.loggedInCheck, mw.checkIfTeacher, (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    /********** USERS *********/
    app.get('/api/teacher', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        return getTeacherInfoById([req.session.user.id]).then(results => {
            res.json({
                success: true,
                teacherInfo: results.rows
            });
        }).catch(e => {
            console.log(e);
            res.json({
                error: e
            });
        });
    });

    /********** ASSIGNMENTS *********/
    app.get('/api/teacher/assignments/:sectionId', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        console.log('TEACHER ROUTES: getting Assignments by section id');
        let data = [req.params.sectionId];
        return getAssignmentNameIdBySection(data).then(results => {
            console.log('Got Assignments Info', results.rows);
            res.json({
                success: true,
                assignmentList: results.rows
            });

        }).catch(e => {
            res.json({
                error: e
            });
        });
    });
    //creates a new assignment.
    app.post('/api/teacher/assignment', mw.loggedInCheck, mw.checkIfTeacher, (req,res)=> {
        //make assignment row in assignments database.
        var assignments = [];
        req.body.assignmentInfo.sections.forEach((section) => {
            return makeNewAssignment(section, req.body.assignmentInfo).then(assignmentId => {
            //now get list of students and for each student make a student report, using user_id make student assignment
                assignments.push({section, assignmentId});

                return getStudentIdsBySectionId([section]).then(results => {
                    console.log('assignments: ', assignments);

                    var students = results.rows;
                    var { include, editable, defaults } = req.body.assignmentInfo;
                    console.log('MAKING STUDENT ASSINGMENTS!!!');
                    return makeStudentAssignments(students, section, assignmentId, include, editable, defaults);
                });
            }).catch(e => {
                console.log(e); // end makeNewAssignment
            });
        }); // end forEach

        //for each student make a row in the appropriate category's table and return the id to the student report.
        console.log(req.body);
        res.json({
            success: true,
            assignmentId: 5
        });
    });
    /********** SECTIONS *********/
    app.post('/api/teacher/section', mw.loggedInCheck, mw.checkIfTeacher, (req, res) => {
        let data = [req.body.courseId, req.body.name, req.body.start, req.body.end];
        console.log(data);
        return saveNewSection(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    //get all the sections a teacher has
    app.get('/api/teacher/sections', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        let data = [req.session.user.id];
        return getAllSections(data).then(results => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    //get only the sections for a particular course
    app.get('/api/teacher/sections/:courseId', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        let data = [req.params.id];
        return getSectionsByCourseId(data).then(results => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    /******** COURSES ***********/
    app.post('/api/teacher/course', mw.loggedInCheck, mw.checkIfTeacher, (req, res) => {
        let data = [req.session.user.id, req.body.name];
        return saveNewCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    app.get('/api/teacher/courses', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        let data = [req.session.user.id];
        //call db
        return getCoursesByTeacher(data).then((results) => {
            res.json({
                success:true,
                courses: results.rows
            })
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    app.delete('/api/teacher/course/:id', mw.loggedInCheck, mw.checkIfTeacher, (req,res) => {
        let data = [req.params.id];
        return deleteCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });
};

module.exports = teacherRoutes;

/*************** UTILITY FUNCTIONS *****************/

function makeNewAssignment(sectionId, info) {
    const { include, shared, defaults } = info;

    if(!info.group_lab) {
        info.group_lab = false;
    }

    if(!info.due) {
        info.due = null;
    }

    if(info.instructions) {
        info.instructions = null;
    }
    var newInclude = massageIncludeObject(include, shared);

    var data = [
        sectionId,
        info.group_lab,
        info.assignmentName,
        info.instructions,
        info.due,
        newInclude.title, defaults.default_title,
        newInclude.abstract, defaults.default_abstract,
        newInclude.question, defaults.default_question,
        newInclude.hypothesis, defaults.default_hypothesis,
        newInclude.variables, defaults.default_variables,
        newInclude.materials, defaults.default_materials,
        newInclude.procedures, defaults.default_procedures,
        newInclude.data, defaults.default_data,
        newInclude.calculations, defaults.default_calc,
        newInclude.discussion, defaults.default_discussion
    ];

    return saveNewAssignmentTemplate(data).then((results) => {
        console.log('Resulting AssignmentId: ', results.rows[0].id)
        return results.rows[0].id;
    }).catch(e => {
        console.log(e);
    });
}

function massageIncludeObject(include, shared){
    for (var key in include ) {
        if(include[key]) {
            if(shared[key]) {
                include[key] = 'group';
            } else {
                include[key] = 'individual';
            }
        } else {
            include[key] = null;
        }
    }

    console.log(include);
    return include;
}

/*
This function uses the list of included categories to make a row in each category table for each student
At the end it calls the function make a row in the student report table
*/
function makeStudentAssignments(students, sectionId, assignmentId, include, editable, defaults) {

    students.forEach(student => {
        console.log('(((students)))', student);
        console.log('defaults', defaults);
        var promiseArr = [];

        for(var key in include) {
            console.log('***** makingStudentAssigns: key:', key);
            if(include[key]) {
                //set data for this key
                var group_id = null;

                var editableBoolean = editable[key] ? editable[key] : false;

                var data = [
                    assignmentId,
                    group_id,
                    editableBoolean,
                    defaults['defaults_' + key]
                ];

                console.log('make student assignment data', data);

                if(key == 'title') {
                    promiseArr.push(newTitle(data).then(results => {
                        return { title: results.rows[0].id};
                    }));
                }
                if(key == 'question') {
                    promiseArr.push(newQuestion(data).then(results => {
                        return { question: results.rows[0].id};
                    }));
                }
                if(key == "abstract"){
                    promiseArr.push(newAbstract(data).then(results => {
                        return { abstract: results.rows[0].id};
                    }));
                }
                if(key == "hypothesis") {
                    promiseArr.push(newHypothesis(data).then(results => {
                        return { hypothesis: results.rows[0].id};
                    }));
                }
                if(key == "variables") {
                    promiseArr.push(newData(data).then(results => {
                        return { variables: results.rows[0].id};
                    }));
                }
                if(key == "materials") {
                    promiseArr.push(newMaterials(data).then(results => {
                        return { materials: results.rows[0].id};
                    }));
                }
                if(key == "procedures") {
                    console.log('adding procedures: ', data);
                    promiseArr.push(newProcedure(data).then(results => {
                        return { procedures: results.rows[0].id};
                    }));
                }
                if(key == "data") {
                    promiseArr.push(newData(data).then(results => {
                        return { data: results.rows[0].id};
                    }));
                }
                if(key == "caluclations") {
                    promiseArr.push(newCalculations(data).then(results => {
                        return { calculations: results.rows[0].id};
                    }));
                }
                if(key == "discussion") {
                    promiseArr.push(newDiscussion(data).then(results => {
                        return { discussion: results.rows[0].id};
                    }));
                } //end long if check


            } //end if(includes[key])
        } //end for loop
        //make new student assignment with categoryIds, student_id and assignment_id

        return Promise.all(promiseArr).then(results => {
            console.log('Results from Promise.all', results);
            return newStudentReport(student.user_id, sectionId, assignmentId, results);

        }).catch(e => {
            console.log('Promise.all error: ', e);
        }); //end catch for promise.all


    }); //end forEach
}

function newStudentReport(studentId, sectionId, assignmentId, categoryIds) {

    var categories = [
        "title",
        "question",
        "abstract",
        "hypothesis",
        "variables",
        "materials",
        "procedures",
        "data",
        "calculations",
        "discussion",
    ];

    var group_id = null;

    var data = [studentId, sectionId, assignmentId, group_id];
    categories.forEach(category => {
        var gotOne = false;
        console.log('category: ', category)
        categoryIds.forEach(id => {
            console.log('id', id);
            if(id[category]) {
                gotOne = true;
                console.log('got one');
                data.push(id[category]);
            }
        });
        if(!gotOne) {
            console.log('pusshing null')
            data.push(null);
        }

    });

    console.log('STUDENT REPORT DATA:', data);
    return saveNewStudentReport(data);

}


//TESTS
// function makeNewAssignmentAll(req) {
//     var assignments = [];
//     req.body.assignmentInfo.sections.forEach((section) => {
//         return makeNewAssignment(section, req.body.assignmentInfo).then(assignmentId => {
//         //now get list of students and for each student make a student report, using user_id make student assignment
//             assignments.push({section, assignmentId});
//
//             return getStudentIdsBySectionId([section]).then(results => {
//                 console.log('assignments: ', assignments);
//
//                 var students = results.rows;
//                 var { include, editable, defaults } = req.body.assignmentInfo;
//                 console.log('MAKING STUDENT ASSINGMENTS!!!');
//                 return makeStudentAssignments(students, section, assignmentId, include, editable, defaults);
//             });
//         }).catch(e => {
//             console.log(e); // end makeNewAssignment
//         });
//     }); // end forEach
// }


//const req = {
//     session: {
//         user: {
//             id: 1
//         }
//     },
//     body1: {
//         assignmentInfo: {
//             sections: [ '1', '2' ],
//             include: {
//                 title: 'individual',
//                 question: null,
//                 abstract: null,
//                 hypothesis: null,
//                 variables: null,
//                 materials: null,
//                 procedures: null,
//                 data: null,
//                 calculations: null,
//                 discussion: null },
//             editable: {},
//             shared: {},
//             defaults: {
//                 defaults_title: '',
//                 defaults_question: '',
//                 defaults_abstract: '',
//                 defaults_hypothesis: '',
//                 defaults_variables: '',
//                 defaults_materials: '',
//                 defaults_procecures: '',
//                 defaults_data: '',
//                 defaults_calculations: '',
//                 defaults_discussion: '',
//                 default_title: 'sdfasdf'
//             },
//             assignmentName: 'asd',
//             instructions: null,
//             group_lab: false,
//             due: null
//         }
//     },
//     body: {
//         assignmentInfo: {
//             sections: [ '1', '2' ],
//             include: {
//                 title: 'group',
//                 question: 'group',
//                 abstract: null,
//                 hypothesis: 'individual',
//                 variables: null,
//                 materials: 'group',
//                 procedures: 'group',
//                 data: 'group',
//                 calculations: 'individual',
//                 discussion: null
//             },
//             editable: {
//                 materials: true,
//                 procedures: true,
//                 data: true,
//                 calculations: true,
//                 title: true,
//                 question: true
//             },
//             shared:{
//                 title: true,
//                 question: true,
//                 materials: true,
//                 procedures: true,
//                 data: true
//             },
//             defaults: {
//                 defaults_title: '',
//                 defaults_question: '',
//                 defaults_abstract: '',
//                 defaults_hypothesis: 'my starting hypothesis',
//                 defaults_variables: '',
//                 defaults_materials: '',
//                 defaults_procecures: '',
//                 defaults_data: '',
//                 defaults_calculations: '',
//                 defaults_discussion: '',
//                 defaults_procedures: 'Follow the procedures on the handout.'
//             },
//             assignmentName: 'Soap lab',
//             due: '2017-10-10',
//             instructions: null,
//             group_lab: true
//         }
//     }
// };


//makeNewAssignmentAll(req);
