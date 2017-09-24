const path = require('path');

const {saveNewCourse, getCoursesByTeacher} = require("../database/teacherDb.js");

var teacherRoutes = (app) => {
    app.get('/teacher', (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    app.post('/api/teacher/course', (req, res) => {
        let data = [1, req.body.name];
        return saveNewCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        })
    })

    app.get('/api/teacher/courses/:teacherId', (req,res) => {
        let data = [req.params.teacherId];
        //call db
        return getCoursesByTeacher(data).then((results) => {
            res.json({
                success:true,
                courses: results.rows
            })
        }).catch(e => {
            res.json({
                error: e
            });
        })
    });
};

module.exports = teacherRoutes;
