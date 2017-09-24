var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);
/********** SECTIONS ************/
function getAllSections(data) {
    console.log('DBQUERY: getAllSections,', data);
    let queryStr = 'INSERT INTO courses (teacher_id, name) VALUES ($1, $2)';
    return db.query(queryStr, data);
}

function getSectionsByCourseId(data) {
    console.log('DBQUERY: getSectionsByCourseId', data);
    let queryStr = 'SELECT sections.id, sections.name, sections.start_date, sections.end_date, courses.id FROM sections JOIN courses ON courses.id = sections.course_id WHERE courses.id = $1';
    return db.query(queryStr, data);
}
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
module.exports.getSectionsByCourseId = getSectionsByCourseId;
module.exports.getAllSections = getAllSections;


//saveNewCourse([1, 'Biology']);
// getCoursesByTeacher([1]).then((results) => {
//     console.log(results.rows);
// }).catch(e => console.error(e));
//deleteCourse([5]);
getSectionsByCourseId([1]).then((results) => {
    console.log(results.rows);
}).catch(e => console.error(e));