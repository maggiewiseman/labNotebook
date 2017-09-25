const path = require('path');
const mw = require('./middleware');

const {saveNewCourse, getCoursesByTeacher, deleteCourse, getAllSections, getSectionsByCourseId, saveNewSection} = require("../database/teacherDb.js");

var teacherRoutes = (app) => {
    app.get('/teacher', mw.loggedInCheck, (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    /********** SECTIONS *********/
    app.post('/api/teacher/section', (req, res) => {
        let data = [req.body.courseId, req.body.name, req.body.start, req.body.end];
        console.log(data);
        return saveNewSection(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });
    //get all the sections a teacher has
    app.get('/api/teacher/sections', (req,res) => {
        //FIX: reset to req.session.id
        let data = [1];
        return getAllSections(data).then(results => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    //get only the sections for a particular course
    app.get('/api/teacher/sections/:courseId', (req,res) => {
        let data = [req.params.id];
        return getSectionsByCourseId(data).then(results => {
            return res.json({
                success: true,
                sections: results.rows
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    /******** COURSES ***********/
    app.post('/api/teacher/course', (req, res) => {
        //FIX: reset num to req.session.id
        let data = [1, req.body.name];
        return saveNewCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });

    app.get('/api/teacher/courses', (req,res) => {
        //FIX to req.session.id once there's a session
        let data = ['1'];
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
        });
    });

    app.delete('/api/teacher/course/:id', (req,res) => {
        let data = [req.params.id];
        return deleteCourse(data).then(() => {
            res.json({
                success: true
            });
        }).catch(e => {
            res.json({
                error: e
            });
        });
    });
};

module.exports = teacherRoutes;
