var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');

var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);


function getCategoriesForGrading(data){
    console.log('Grading_DB: getCategoriesForGrading,', data);
    let queryStr = 'SELECT titles.content, titles.id, titles.group_id, titles.comments, titles.grade, students_reports.id AS report_id, students_reports.student_id, students_reports.status FROM students_reports JOIN titles ON students_reports.title_id = titles.id WHERE students_reports.assignment_id = $1;';
    return db.query(queryStr, data);
}

module.exports.getCategoriesByID = function (report_id, assignment_id) {
    const select = `SELECT group_id, title_id, abstract_id, question_id, hypothesis_id, variables_id, materials_id, procedures_id, data_id, calculations_id, discussion_id FROM students_reports WHERE students_reports.id = $1 AND assignment_id = $2`
    const result = db.query(select, [report_id, assignment_id]);
    return result;
}


module.exports.getCategoriesForGrading = getCategoriesForGrading;


//*********************update grade/comments********/////

module.exports.updateTitles = function (id, comments, grade) {

    const update = `UPDATE titles SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateQuestions= function (id, comments, grade) {

    const update = `UPDATE questions SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateAbstracts= function (id, comments, grade) {

    const update = `UPDATE abstracts SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateHypotheses = function (id, comments, grade) {

    const update = `UPDATE hypotheses SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateVariables= function (id, comments, grade) {

    const update = `UPDATE variables SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}


module.exports.updateMaterials = function (id, comments, grade) {

    const update = `UPDATE materials SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateProcedures = function (id, comments, grade) {

    const update = `UPDATE procedures SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}
module.exports.updateData = function (id, comments, grade) {

    const update = `UPDATE data SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateCalculations = function (id, comments, grade) {

    const update = `UPDATE calculations SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

module.exports.updateDiscussions = function (id, comments, grade) {

    const update = `UPDATE discussions SET comments = $2, grade = $3 WHERE id = $1`;
    const result = db.query(update, [id, comments, grade]);
    return result;
}

//**********************commitGrade/Comment/Status**********//

module.exports.finalReportGrade = function (report_id, assignment_id, grade, comment, status) {
    const update = `UPDATE students_reports SET status=$5, grade=$3, comments=$4 WHERE students_reports.id=$1 AND assignment_id=$2 RETURNING grade, comments, status`;
    const result = db.query(update, [report_id, assignment_id, grade, comment, status]);
    return result;
}

//****************getAssignment per student *********////

module.exports.getAssignment = function (report_id, assignment_id) {

const select = `SELECT first_name, last_name, students_reports.assignment_id, students_reports.status, students_reports.comments AS report_comments, students_reports.grade AS report_grade, titles.editable AS title_editable, titles.content AS title_content, titles.comments AS title_comments, titles.grade AS title_grade, questions.editable AS question_editable, questions.content AS question_content, questions.comments AS question_comments, questions.grade AS question_grade, abstracts.editable AS abstract_editable, abstracts.content AS abstract_content, abstracts.comments AS abstract_comments, abstracts.grade AS abstract_grade, hypotheses.editable AS hypothesis_editable, hypotheses.content AS hypothesis_content, hypotheses.comments AS hypothesis_comments, hypotheses.grade AS hypothesis_grade, variables.editable AS variable_editable, variables.content AS variable_content, variables.comments AS variable_comments, variables.grade AS variable_grade, materials.editable AS material_editable, materials.content AS material_content, materials.comments AS material_comments, materials.grade AS material_grade, procedures.editable AS procedure_editable, procedures.content AS procedure_content, procedures.comments AS procedure_comments, procedures.grade AS procedure_grade, data.editable AS data_editable, data.content AS data_content, data.comments AS data_comments, data.grade AS data_grade, calculations.editable AS calculation_editable, calculations.content AS calculation_content, calculations.comments AS calculation_comments, calculations.grade AS calculation_grade, discussions.editable AS discussion_editable, discussions.content AS discussion_content, discussions.comments AS discussion_comments, discussions.grade AS discussion_grade
FROM students_reports
LEFT JOIN users ON students_reports.student_id = users.id
LEFT JOIN titles ON students_reports.assignment_id = titles.assignment_id
LEFT JOIN questions ON students_reports.assignment_id = questions.assignment_id
LEFT JOIN abstracts ON students_reports.assignment_id = abstracts.assignment_id
LEFT JOIN hypotheses ON students_reports.assignment_id = hypotheses.assignment_id
LEFT JOIN variables ON students_reports.assignment_id = variables.assignment_id
LEFT JOIN materials ON students_reports.assignment_id = materials.assignment_id
LEFT JOIN procedures ON students_reports.assignment_id = procedures.assignment_id
LEFT JOIN data ON students_reports.assignment_id = data.assignment_id
LEFT JOIN calculations ON students_reports.assignment_id = calculations.assignment_id
LEFT JOIN discussions ON students_reports.assignment_id = discussions.assignment_id
WHERE students_reports.id = $1 AND students_reports.assignment_id = $2`;

const result = db.query(select, [report_id, assignment_id]);
return result;
}
