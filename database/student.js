var spicedPg = require('spiced-pg');;
var bcrypt = require('bcryptjs');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);

module.exports.addNewClass = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result
};


module.exports.getAssignmentsPerSection = function (section_id) {
    console.log('getting all assignments from db');
    const select = `SELECT * FROM assignments WHERE section_id=$1`;
    const result = db.query(select, [section_id]);
    return result;
}

module.exports.addStudentsReports = function (user_id, code, assignment_id) {

    const insert = `INSERT INTO students_reports (student_id, section_id, assignment_id) VALUES ($1, $2, $3) RETURNING section_id`;
    const result = db.query(insert, [user_id, code, assignment_id]);
    return result
};

module.exports.getStudentData = function (email) {

    const select = `SELECT users.id AS student_id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.course_id, courses.id AS course_id, courses.name AS course_name
    FROM users
    JOIN users_sections ON users.id = user_id
    JOIN sections ON users_sections.section_id = sections.id
    JOIN courses ON course_id=courses.id
    WHERE email=$1`;

    const result = db.query(select, [email]);

    return result;
}


module.exports.updateClassList = function (user_id) {
    const select = `SELECT courses.name AS course_name, sections.id AS section_id, courses.id AS course_id FROM users_sections
    JOIN sections ON section_id = sections.id
    JOIN courses ON course_id=courses.id WHERE user_id=$1`;

    const result = db.query(select, [user_id]);
    return result;
}

module.exports.getAssignmentList = function (user_id, section_id) {

    const select = ` SELECT assignments.name AS assignment_name, assignments.section_id, assignments.id AS assignment_id FROM users_sections JOIN assignments ON users_sections.section_id = assignments.section_id WHERE user_id=$1;`;

    const result = db.query(select, [user_id]);

    return result;
}

module.exports.getReportByID = function (user_id, assignment_id) {
    const select =`SELECT id FROM students_reports WHERE student_id=$1 AND assignment_id=$2`;
    const result = db.query(select, [user_id, assignment_id]);
    return result;
}


module.exports.checkStudentClasses = function (user_id) {
    const select = `SELECT section_id FROM users_sections WHERE user_id=$1`;
    const result = db.query(select, [user_id]);
    return result;
}


module.exports.updateAssignmentStatus = function (student_id, assignment_id, status) {
    const update = `UPDATE students_reports SET status=$3 WHERE student_id=$1 AND assignment_id=$2 RETURNING status`;
    const result = db.query(update, [student_id, assignment_id, status]);
    return result;
}

module.exports.getAssignmentStatus = function (student_id, assignment_id) {
    const select = 'SELECT status FROM students_reports WHERE student_id=$1 AND assignment_id=$2';
    const result = db.query(select, [student_id, assignment_id]);
    return result;

}
//****************UPDATE ASSIGNMENTS *********************//

module.exports.updateTitles = function (assignment_id, content) {

    const update = `UPDATE titles SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateQuestions= function (assignment_id, content) {

    const update = `UPDATE questions SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateAbstracts= function (assignment_id, content) {

    const update = `UPDATE abstracts SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateHypotheses = function (assignment_id, content) {

    const update = `UPDATE hypotheses SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateVariables= function (assignment_id, content) {

    const update = `UPDATE variables SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}


module.exports.updateMaterials = function (assignment_id, content) {

    const update = `UPDATE materials SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateProcedures = function (assignment_id, content) {

    const update = `UPDATE procedures SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}
module.exports.updateData = function (assignment_id, content) {

    const update = `UPDATE data SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateCalculations = function (assignment_id, content) {

    const update = `UPDATE calculations SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}

module.exports.updateDiscussions = function (assignment_id, content) {

    const update = `UPDATE discussions SET content = $2 WHERE assignment_id = $1 RETURNING content`;
    const result = db.query(update, [assignment_id, content]);
    return result;
}


//************************getAssignment************************//


module.exports.getAssignment = function (report_id, assignment_id) {

const select = `SELECT students_reports.id, students_reports.status, students_reports.comments AS report_comments, students_reports.grade AS report_grade, titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade FROM students_reports
LEFT JOIN titles ON students_reports.title_id = titles.id
LEFT JOIN questions ON students_reports.question_id = questions.id
LEFT JOIN abstracts ON students_reports.abstract_id = abstracts.id
LEFT JOIN hypotheses ON students_reports.hypothesis_id = hypotheses.id
LEFT JOIN variables ON students_reports.variables_id = variables.id
LEFT JOIN materials ON students_reports.materials_id = materials.id
LEFT JOIN procedures ON students_reports.procedures_id = procedures.id
LEFT JOIN data ON students_reports.data_id = data.id
LEFT JOIN calculations ON students_reports.calculations_id = calculations.id
LEFT JOIN discussions ON students_reports.discussion_id = discussions.id
WHERE students_reports.id = $1 AND students_reports.assignment_id = $2`;

const result = db.query(select, [report_id, assignment_id]);
return result;
}
