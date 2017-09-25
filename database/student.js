var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
const secrets = require('../secrets.json');
const db = spicedPg(`postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`);

module.exports.makeCourse = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result
};

module.exports.getStudentData = function (email) {

    const select = `SELECT users.id, first_name, last_name, user_id, section_id, sections.id, sections.id, sections.name, course_id, courses.id, courses.name, teacher_id
    FROM users
    JOIN users_sections ON users.id = user_id
    JOIN sections ON section_id = sections.id JOIN courses ON course_id=courses.id WHERE email=$1`;

    const result = db.query(select, [email]);

    return result;
}
