var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
const secrets = require('../secrets.json');
const db = spicedPg(`postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnotebook`);




module.exports.hashPassword = function (plainTextPassword) {

    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(function (err, salt) {
            if (err) {
                return reject(err);
            }
            console.log(plainTextPassword, salt);
            bcrypt.hash(plainTextPassword, salt, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);


            });
        });
    });
};

module.exports.checkPassword = function (textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function (err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};


module.exports.addStudent = function (first, last, email, password, course) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, course, role) VALUES ($1, $2, $3, $4, $5, 'student') RETURNING id, first_name, last_name, email, role`;
    const result = db.query(insert, [first, last, email, password, course]);
    return result;
}

module.exports.addTeacher = function (first, last, email, password) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'teacher') RETURNING id, first_name, last_name, email, role`;
    const result = db.query(insert, [first, last, email, password]);
    return result;
}

module.exports.getUserByEmail = function (email) {
    const select  = `SELECT * FROM users WHERE email=$1`;
    const result = db.query(select, [email]);
    return result;
}
