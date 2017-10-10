var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbuser}:${secrets.dbpassword}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);



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

module.exports.addStudent = function (first_name, last_name, email, password) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'student') RETURNING id, first_name, last_name, email, role `;
    const result =  db.query(insert, [first_name, last_name, email, password]);
    return result;
}

module.exports.addTeacher = function (first_name, last_name, email, password) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'teacher') RETURNING id, first_name, last_name, email, role `;
    const result = db.query(insert, [first_name, last_name, email, password]);
    return result;
}

module.exports.getUserByEmail = function (email) {
    const select  = `SELECT * FROM users WHERE email=$1`;
    const result = db.query(select, [email]);
    return result;
}
