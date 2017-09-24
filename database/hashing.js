var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);


module.exports.hashPassword = function (plainTextPassword) {
    console.log("about to hash", plainTextPassword);
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
                console.log('users.js: hashPassword successful', hash)

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


module.exports.addUser = function (first, last, email, password, course, role) {

    const insert = `INSERT INTO users (first_name, last_name, email, password, course, role ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, role`;

    const result = db.query(insert);

    return result;
}
