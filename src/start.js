import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

//Reducers
import teacherReducer from './teacher/reducer';
import studentReducer from './student/reducer';

//Component Import
import Welcome from './auth/welcome';
import Registration from './auth/registration';
import Login from './auth/login';
import { composeWithDevTools } from 'redux-devtools-extension';

//Student Component Imports
import StudentApp from './student/app';
import StudentDashboard from './student/dashboard';
import AssignmentView from './student/components/AssignmentView'

//Teacher Component Imports
import TeacherApp from './teacher/views/app';
import TeacherDashboard from './teacher/views/dashboard';
import TeacherCourses from './teacher/views/courses';
import TeacherAssignments from './teacher/views/assignments';
import TeacherNewAssignment from './teacher/views/newAssignment';
import SpecificAssignment from './teacher/views/specificAssignment';
import GradeACategory from './teacher/views/gradeCategory';
import GradeAStudent from './teacher/views/GradeAStudent';



//Redux Setup
//when we edit the state object in teacherReduer only the teacher part of state will change. It will be unable to overwrite anything in studetns.
const reducers = combineReducers({
    teachers: teacherReducer,
    students: studentReducer,
});

 const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)));

//Routers
const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={Registration} />
            <Route path="login" component={Login} />
        </Route>
    </Router>
);

const studentRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/student" component={StudentApp}>
                <IndexRoute component={StudentDashboard}/>
                <Route path="/student/:classid/assignment/:id" component={AssignmentView} />
            </Route>
        </Router>
    </Provider>
)

const teacherRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/teacher" component={TeacherApp}>
                <Route path="/teacher/courses" component={TeacherCourses} />
                <Route path="/teacher/assignments" component={TeacherAssignments}/>
                <Route path="/teacher/new/assignment" component={TeacherNewAssignment} />
                <Route path="/teacher/assignment/:id" component={SpecificAssignment} />
                <Route path="/teacher/category/assignment/:sectionid/:assignmentid/:category" component={GradeACategory} />
                <Route path="/teacher/grading/assignment/:id/student/:reportid" component={GradeAStudent} />
                <IndexRoute component={TeacherDashboard}/>
            </Route>
        </Router>
    </Provider>
)

let route;
if(location.pathname == '/' || location.pathname == '/register' || location.pathname == '/login') {
    route = loggedOutRouter;
} else if (location.pathname.substring(0,8) == '/student') {
    console.log('using student router');
    route = studentRouter;
} else if (location.pathname.substring(0,8) == '/teacher') {
    console.log('using teacher router');
    route = teacherRouter;
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
