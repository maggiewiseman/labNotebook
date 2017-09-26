var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
const secrets = require('../secrets.json');
const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`);

module.exports.addNewClass = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
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

module.exports.getAssignment = function (student_id, assignment_id) {

const select = `SELECT titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade FROM students_reports
JOIN titles ON students_reports.assignment_id = titles.assignment_id
JOIN questions ON students_reports.assignment_id = questions.assignment_id
JOIN abstracts ON students_reports.assignment_id = abstracts.assignment_id
JOIN hypotheses ON students_reports.assignment_id = hypotheses.assignment_id
JOIN variables ON students_reports.assignment_id = variables.assignment_id
JOIN materials ON students_reports.assignment_id = materials.assignment_id
JOIN procedures ON students_reports.assignment_id = procedures.assignment_id
JOIN data ON students_reports.assignment_id = data.assignment_id
JOIN calculations ON students_reports.assignment_id = calculations.assignment_id
JOIN discussions ON students_reports.assignment_id = discussions.assignment_id
WHERE students_reports.student_id = $1 AND students_reports.assignment_id = $2`;

const result = db.query(select, [student_id, assignment_id]);
return result;
}
