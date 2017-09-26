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

    const select = `SELECT users.id, first_name, last_name, users_sections.user_id, users_sections.section_id, sections.id, sections.course_id, courses.id, courses.name AS course_name
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
