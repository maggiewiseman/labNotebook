var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
const secrets = require('../secrets.json');
const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`);

function getCategoriesForGrading(data){
    console.log('Grading_DB: getCategoriesForGrading,', data);
    let queryStr = 'SELECT titles.content, students_reports.id AS report_id, students_reports.student_id, students_reports.status FROM students_reports JOIN titles ON students_reports.title_id = titles.id WHERE students_reports.assignment_id = 1;';
    return db.query(queryStr, data);
}


module.exports.getCategoriesForGrading = getCategoriesForGrading;

module.exports.getAssignment = function (report_id, assignment_id) {

const select = `SELECT first_name, last_name, students_reports.assignment_id, students_reports.status, titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade FROM students_reports
FULL OUTER JOIN users ON students_reports.student_id = users.id
FULL OUTER JOIN titles ON students_reports.assignment_id = titles.assignment_id
FULL OUTER JOIN questions ON students_reports.assignment_id = questions.assignment_id
FULL OUTER JOIN abstracts ON students_reports.assignment_id = abstracts.assignment_id
FULL OUTER JOIN hypotheses ON students_reports.assignment_id = hypotheses.assignment_id
FULL OUTER JOIN variables ON students_reports.assignment_id = variables.assignment_id
FULL OUTER JOIN materials ON students_reports.assignment_id = materials.assignment_id
FULL OUTER JOIN procedures ON students_reports.assignment_id = procedures.assignment_id
FULL OUTER JOIN data ON students_reports.assignment_id = data.assignment_id
FULL OUTER JOIN calculations ON students_reports.assignment_id = calculations.assignment_id
FULL OUTER JOIN discussions ON students_reports.assignment_id = discussions.assignment_id
WHERE students_reports.id = $1 AND students_reports.assignment_id = $2`;

const result = db.query(select, [report_id, assignment_id]);
return result;
}
