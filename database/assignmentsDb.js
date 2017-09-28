var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);
/********** STUDENT REPORTS *********/
function getStudentsAssignmentIdsBySection(data) {
    console.log('Assignment_DB: getStudentsAssignmentIdsBySection');
    let queryStr = `SELECT first_name, last_name, assignments.name, students_reports.id AS report_id, students_reports.status FROM assignments FULL OUTER JOIN students_reports ON assignments.id = students_reports.assignment_id FULL OUTER JOIN users ON students_reports.student_id =  users.id WHERE assignments.id=$1`;
    return db.query(queryStr, data);
}

//TESTS
// getStudentsAssignmentIdsBySection([1]).then(results => {
//     console.log(results.rows);
// }).catch(e => console.log(e));

function saveNewStudentReport(data) {
    console.log('Assignment_DB: saveNewStudentReport');
    let queryStr = `INSERT INTO students_reports (student_id, section_id, assignment_id, group_id, title_id, question_id, abstract_id, hypothesis_id, variables_id, materials_id, procedures_id, data_id, calculations_id, discussion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
    return db.query(queryStr, data);
}

//TEST
// saveNewStudentReport([ 2, 1, 116, null, 137, 137, null, 92, null, 137, 137, 137, null, null ]).then(result => {
//       console.log(result);
//   }).catch(e => {
//       console.log(e);
//   });

function newTitle(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO titles (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}


function newQuestion(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO questions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newAbstract(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO abstracts (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newHypothesis(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO hypotheses (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newVariables(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO variables (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newMaterials(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO materials (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newProcedure(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO procedures (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newData(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO data (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newCalculations(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO calculations (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

function newDiscussion(data) {
    console.log('TEACHER_DB newAbstract');
    let queryStr = `INSERT INTO discussions (assignment_id, group_id, editable, content) VALUES ($1, $2, $3, $4) RETURNING id`;
    return db.query(queryStr, data);
}

module.exports.getStudentsAssignmentIdsBySection = getStudentsAssignmentIdsBySection;
module.exports.saveNewStudentReport = saveNewStudentReport;
module.exports.newTitle = newTitle;
module.exports.newQuestion = newQuestion;
module.exports.newAbstract = newAbstract;
module.exports.newHypothesis = newHypothesis;
module.exports.newVariables = newVariables;
module.exports.newMaterials = newMaterials;
module.exports.newProcedure = newProcedure;
module.exports.newData = newData;
module.exports.newCalculations = newCalculations;
module.exports.newDiscussion = newDiscussion;

//TEST:

// newAbstract([42, null, true, "Starting Abstract"]).then(results => {
//     console.log(results.rows);
// }).catch(e => {
//     console.log(e);
// });

//saveNewStudentReport([])
/********** SAVING GRADES BY CATEGORY *********/
function getCategoriesForGrading(tableName, data){

    console.log('Grading_DB: getCategoriesForGrading,', data);

    let queryStr = makeQuery(tableName);

    return db.query(queryStr, data);
}
module.exports.getCategoriesForGrading = getCategoriesForGrading;

function makeQuery(tableName) {

    var tableOptions = {
        title: 'titles',
        question: 'questions',
        variable: 'variables',
        hypothesis: 'hypotheses',
        abstract: 'abstracts',
        procedure: 'procedures',
        material: 'materials',
        data: 'data',
        discussion: 'discussions',
        calculation: 'calculations'
    };
    if(tableOptions[tableName]) {
        return `SELECT ${tableOptions[tableName]}.content, ${tableOptions[tableName]}.id, ${tableOptions[tableName]}.group_id, ${tableOptions[tableName]}.comments, ${tableOptions[tableName]}.grade, students_reports.id AS report_id, students_reports.student_id, students_reports.status, users.first_name, users.last_name, users.id AS user_id FROM students_reports JOIN ${tableOptions[tableName]} ON students_reports.title_id = ${tableOptions[tableName]}.id JOIN users ON users.id = students_reports.student_id WHERE students_reports.assignment_id = $1;`;
    } else {
        throw Error("Invalid table name");
    }
}
//TESTS
//console.log(makeQuery('titles'));
// getCategoriesForGrading('abstract',[1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => {
//
//     console.log(e);
// });
/********** ASSIGNMENTS *********/
function getAssignmentProperties(data) {
    console.log('ASSIGNMENT_DB: getAssignmentProperties', data);
    let queryStr = 'SELECT * FROM assignments WHERE id = $1';
    return db.query(queryStr, data);
}
function getAssignmentNameIdBySection(data) {
    console.log('ASSIGNMENT_DB: getAssignmentNameIdBySection,', data);
    let queryStr = 'SELECT id, name, due FROM assignments WHERE section_id = $1';
    return db.query(queryStr, data);
}
function saveNewAssignmentTemplate(data) {
    console.log('ASSIGNMENT_DB: saveNewAssignmentTemplate,', data);
    let queryStr = 'INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING id';
    return db.query(queryStr, data);
}
//Test
// getAssignmentProperties([2]).then((results) => {
//         console.log(results.rows);
//     }).catch(e => {
//         console.log(e);
//     });
// saveNewAssignmentTemplate([1, false, '3moles', 'instructions', '1999-01-01', 'word', 'word', 'word8', 'word9', 'word9','word11', 'word9','word13', 'word9', 'word15', 'word9', 'word17', 'word9', 'word19', 'word20', 'word21', 'word22', 'word23', 'word24', 'word25'])
//     .then((results) => {
//         console.log(results.rows);
//     }).catch(e => {
//         console.log(e);
//     });

// INSERT INTO assignments (section_id, group_lab, name, instructions, due, title, default_title, abstract, default_abstract, question, default_question, hypothesis, default_hypothesis, variables, default_variables, materials, default_materials, procedures, default_procedures, data, default_data, calculations, default_calc, discussion, default_discussion) VALUES (1, false, '3moles', '4no instructions', '1999-01-01', '$6', '$7', '$8', '$9', '10', '11', '12', '13', '14', '$15', '$16', '$17', '$18', '$19', '$20', '21', '22', '$23', '$24', '$25') RETURNING id;

module.exports.saveNewAssignmentTemplate = saveNewAssignmentTemplate;
module.exports.getAssignmentNameIdBySection = getAssignmentNameIdBySection;
module.exports.getAssignmentProperties = getAssignmentProperties;
