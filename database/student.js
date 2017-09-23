var spicedPg = require('spiced-pg');
var localUrl = '';

if(!process.env.DATABASE_URL) {
    const secrets = require('../secrets.json');
    localUrl = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/labnb`;
}
var dbUrl = process.env.DATABASE_URL || localUrl;

var db = spicedPg(dbUrl);

module.exports.makeCourse = (data) => {
    
};
