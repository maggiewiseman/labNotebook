const path = require('path');
const dbHashing = require('../database/hashing');
const dbStudent = require('../database/student');
const mw = require('./middleware');


var teacherGradingRoutes = (app) => {

    app.get('/teacher/grading/assignment/:id/student/:studentid', (req, res) => {





    })




};

module.exports = teacherGradingRoutes;
