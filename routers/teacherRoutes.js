const path = require('path');
const mw = require('./middleware');

const {saveNewCourse, getCoursesByTeacher, deleteCourse, getAllSections, getSectionsByCourseId, saveNewSection, getStudentIdsBySectionId} = require("../database/teacherDb");

const {saveNewAssignmentTemplate, saveNewStudentReport, newTitle, newQuestion, newAbstract, newHypothesis,newVariables, newMaterials, newProcedure, newData, newCalculations, newDiscussion} = require("../database/assignmentsDb")

var teacherRoutes = (app) => {
    app.get('/teacher', mw.loggedInCheck, (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    /********** ASSIGNMENTS *********/
    //creates a new assignment.
    app.post('/api/teacher/assignment', mw.loggedInCheck, (req,res)=> {
        //make assignment row in assignments database.
        req.body.assignmentInfo.sections.forEach((section) => {
            return makeNewAssignment(section, req.body.assignmentInfo).then((assignmentId) => {
                console.log('assignmentId', assignmentId);
                console.log('sectionId', section);
                //now get list of students and for each student make a student report, using user_id make student assignment
                return getStudentIdsBySectionId([section]).then(results => {
                    var students = results.rows;
                    console.log('students', students);
                }).catch(e => {
                    console.log(e);
                });
                //then for each include make a row in each categorie's table with student_id and stuff
            });


        });


        //for each student make a row in the appropriate category's table and return the id to the student report.
        console.log(req.body);
        res.json({
            success: true,
            assignmentId: 5
        });
    });
    /********** SECTIONS *********/
    app.post('/api/teacher/section', mw.loggedInCheck, (req, res) => {
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
    app.get('/api/teacher/sections', mw.loggedInCheck, (req,res) => {
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
    app.get('/api/teacher/sections/:courseId', mw.loggedInCheck, (req,res) => {
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
    app.post('/api/teacher/course', mw.loggedInCheck, (req, res) => {
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

    app.get('/api/teacher/courses', mw.loggedInCheck, (req,res) => {
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

    app.delete('/api/teacher/course/:id', mw.loggedInCheck, (req,res) => {
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
saveNewStudentReport, newTitle, newQuestion, newAbstract, newHypothesis,newVariables, newMaterials, newProcedure, newData, newCalculations, newDiscussion

include: {
    title: 'group',
    question: 'group',
    abstract: null,
    hypothesis: null,
    variables: null,
    materials: 'group',
    procedures: 'group',
    data: 'group',
    calculations: 'individual',
    discussion: null
},

*/
function makeStudentAssignments(students, includes) {
    students.forEach(student => {
        // need to know what to include...
        for(var key in includes) {
            if(includes[key]) {
                var functionName = 'new' + key.charAt(0).toUpperCase() + key.slice(1);
                console.log('functionName,', functionName);
            }
        }
    })
}





//TESTS
function makeNewAssignmentAll(req) {
    var assignments = [];
    req.body.assignmentInfo.sections.forEach((section) => {
        return makeNewAssignment(section, req.body.assignmentInfo).then(assignmentId => {
            //now get list of students and for each student make a student report, using user_id make student assignment
            assignments.push({section, assignmentId});

            return getStudentIdsBySectionId([section]);
        }).then(results => {
            //then for each include make a row in each category's table with student_id and stuff
            console.log('assignments: ', assignments);
            var students = results.rows;

            //get the list of items that are supposed to be included and then include them.
            var includes = req.body.assignmentInfo.include
            makeStudentAssignments(students, includes);
        }).catch(e => {
            console.log(e);
        });
    });
}


const req = {
    session: {
        user: {
            id: 1
        }
    },
    body1: {
        assignmentInfo: {
            sections: [ '4' ],
            include: {
                title: 'individual',
                question: null,
                abstract: null,
                hypothesis: null,
                variables: null,
                materials: null,
                procedures: null,
                data: null,
                calculations: null,
                discussion: null },
            editable: {},
            shared: {},
            defaults: {
                defaults_title: '',
                defaults_question: '',
                defaults_abstract: '',
                defaults_hypothesis: '',
                defaults_variables: '',
                defaults_materials: '',
                defaults_procecures: '',
                defaults_data: '',
                defaults_calculations: '',
                defaults_discussion: '',
                default_title: 'sdfasdf'
            },
            assignmentName: 'asd',
            instructions: null,
            group_lab: false,
            due: null
        }
    },
    body: {
        assignmentInfo: {
            sections: [ '3', '4' ],
            include: {
                title: 'group',
                question: 'group',
                abstract: null,
                hypothesis: null,
                variables: null,
                materials: 'group',
                procedures: 'group',
                data: 'group',
                calculations: 'individual',
                discussion: null
            },
            editable: {
                materials: true,
                procedures: true,
                data: true,
                calculations: true,
                title: true,
                question: true
            },
            shared:{
                title: true,
                question: true,
                materials: true,
                procedures: true,
                data: true
            },
            defaults: {
                defaults_title: '',
                defaults_question: '',
                defaults_abstract: '',
                defaults_hypothesis: '',
                defaults_variables: '',
                defaults_materials: '',
                defaults_procecures: '',
                defaults_data: '',
                defaults_calculations: '',
                defaults_discussion: '',
                default_procedures: 'Follow the procedures on the handout.'
            },
            assignmentName: 'Soap lab',
            due: '2017-10-10',
            instructions: null,
            group_lab: true
        }
    }
};


makeNewAssignmentAll(req);
