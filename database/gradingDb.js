var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);

function getCategoriesForGrading(data){
    console.log('Grading_DB: getStudentIdsBySectionId,', data);
    let queryStr = 'SELECT titles.content, students_reports.id AS report_id, students_reports.student_id, students_reports.status FROM students_reports JOIN titles ON students_reports.assignment_id = titles.assignment_id WHERE students_reports.assignment_id = 1;';
    return db.query(queryStr, data);
}

module.exports.getCategoriesForGrading = getCategoriesForGrading;
