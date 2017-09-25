var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);

module.exports.makeCourse = function (user_id, code) {

    const insert = `INSERT INTO users_sections (user_id, section_id) VALUES ($1, $2) RETURNING section_id`;
    const result = db.query(insert, [user_id, code]);
    return result
};

module.exports.getStudentData = function (email) {

    const select = `SELECT first_name, last_name, email, role, section_id FROM users JOIN users_sections ON users.id = users_sections.user_id WHERE email = $1`
    const result = db.query(select, [email]);
    return result;
}
