var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);
/********** ASSIGNMENTS *********/
function saveNewAssignmentTemplate(data) {
    console.log('DBQUERY: saveNewAssignmentTemplate,', data);
    let queryStr = 'INSERT INTO assignments (section_id, group_lab, name, instructions, title, abstract, question, hypothesis, variables, materials, procedures, data, calculations, discussion) VALUES ($1, $2, $3, #4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)';
    return db.query(queryStr, data);
}

module.exports.saveNewAssignmentTemplate = saveNewAssignmentTemplate;

/********** STUDENTS ************/
function getStudentIdsBySectionId(data){
    console.log('DBQUERY: getStudentIdBySection,', data);
    let queryStr = 'SELECT user_id FROM users_sections WHERE section_id = $1';
    return db.query(queryStr, data);
}

function getStudentDataBySectionId(data){
    console.log('DBQUERY: getStudentDataBySection,', data);
    let queryStr = 'SELECT users_sections.user_id, users.first_name, users.last_name, users.profile_pic FROM users_sections JOIN users ON users_sections.user_id = users.id WHERE section_id = $1';
    return db.query(queryStr, data);
}

module.exports.getStudentDataBySectionId = getStudentDataBySectionId;
module.exports.getStudentIdsBySectionId = getStudentIdsBySectionId;

/********** SECTIONS ************/
function saveNewSection(data) {
    console.log('DBQUERY: saveNewSection,', data);
    let queryStr = 'INSERT INTO sections (course_id, name, start_date, end_date) VALUES ($1, $2, $3, $4)';
    return db.query(queryStr, data);
}
function getAllSections(data) {
    console.log('DBQUERY: getAllSections,', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.teacher_id, courses.id AS course_id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.teacher_id = $1';
    return db.query(queryStr, data);
}

function getSectionsByCourseId(data) {
    console.log('DBQUERY: getSectionsByCourseId', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1';
    return db.query(queryStr, data);
}


module.exports.saveNewSection = saveNewSection;
module.exports.getSectionsByCourseId = getSectionsByCourseId;
module.exports.getAllSections = getAllSections;

/********* COURSES *************/
function saveNewCourse(data) {
    console.log('DBQUERY: saveNewCourse,', data);
    let queryStr = 'INSERT INTO courses (teacher_id, name) VALUES ($1, $2)';
    return db.query(queryStr, data);
}

function getCoursesByTeacher(data){
    console.log('DBQUERY: saveNewCourse.');
    let queryStr = 'SELECT * FROM courses WHERE teacher_id = $1';
    return db.query(queryStr, data);
};

function deleteCourse(id) {
    console.log('DBQUERY: deleteCourse.');
    let queryStr = 'DELETE FROM courses WHERE id=$1';
    return db.query(queryStr, id);
}


module.exports.saveNewCourse = saveNewCourse;
module.exports.getCoursesByTeacher = getCoursesByTeacher;
module.exports.deleteCourse = deleteCourse;



//saveNewCourse([1, 'Biology']);
// getCoursesByTeacher([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));
//deleteCourse([5]);
// getAllSections([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));
