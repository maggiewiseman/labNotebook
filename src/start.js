import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
//import reducer from './reducers';


//Components
import Welcome from './auth/welcome';
import Registration from './auth/registration';
import StudentApp from './student/app';
import StudentDashboard from './student/dashboard';
import TeacherApp from './teacher/views/app';
import TeacherDashboard from './teacher/views/dashboard';


// const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)));

const loggedOutRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);

const studentRouter = (
    <Router history={browserHistory}>
        <Route path="/student" component={StudentApp}>
            <IndexRoute component={StudentDashboard}/>
        </Route>
    </Router>
)

// const teacherRouter = (
//     // <Provider store={store}>
//     //     <Router history={browserHistory}>
//     //         <Route path="/teacher" component={TeacherApp}>
//     //             <IndexRoute component={TeacherDashboard}/>
//     //         </Route>
//     //     </Router>
//     // </Provider>
// )

let route = loggedOutRouter;
if (location.pathname == '/student') {
    console.log('using student router');
    route = studentRouter;
}
// else if (location.pathname == '/teacher') {
//     route = teacherRouter;
// }

ReactDOM.render(
    route,
    document.querySelector('main')
);
