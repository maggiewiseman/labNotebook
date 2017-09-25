const path = require('path');
const mw = require('./middleware');

const {saveNewCourse, getCoursesByTeacher, deleteCourse, getAllSections, getSectionsByCourseId, saveNewSection} = require("../database/teacherDb.js");

var teacherRoutes = (app) => {
    app.get('/teacher', mw.loggedInCheck, (req, res) => {
        return res.sendFile( path.join( __dirname, '../index.html' ) );
    });

    /********** ASSIGNMENTS *********/
    //creates a new assignment.
    app.post('/api/teacher/assignment', mw.loggedInCheck, (req,res)=> {
        //make assignment row in assignments database.
        //then for each section clicked, get list of students and for each student make a student report
        //for each student make a row in the appropriate category's table and return the id to the student report.
        res.json({
            success: true,
            assignmentId: 5
        });
    });
    /********** SECTIONS *********/
    app.post('/api/teacher/section', mw.loggedInCheck, (req, res) => {
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
    app.get('/api/teacher/sections', mw.loggedInCheck, (req,res) => {
        let data = [req.session.user.id];
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
    app.get('/api/teacher/sections/:courseId', mw.loggedInCheck, (req,res) => {
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
    app.post('/api/teacher/course', mw.loggedInCheck, (req, res) => {
        let data = [req.session.user.id, req.body.name];
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

    app.get('/api/teacher/courses', mw.loggedInCheck, (req,res) => {
        let data = [req.session.user.id];
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

    app.delete('/api/teacher/course/:id', mw.loggedInCheck, (req,res) => {
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
