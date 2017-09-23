import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

//
function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
//
//
// const authRouter = (
//     <Router history={hashHistory}>
//         <Route path="/" component={HelloWorld}>
//
//         </Route>
//     </Router>
// );
//
// const appRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={HelloWorld}>
//             <IndexRoute component={HelloWorld} />
//             <Route path='friends' component={HelloWorld} />
//             <Route path="profile/:id" component={HelloWorld} />
//         </Route>
//     </Router>
// );
//
//
// let route = appRouter;
// if (location.pathname == '/welcome/') {
//     route = authRouter;
// }
// const loggedOutRouter = (
//     <Router history={browserHistory}>
//         <Route path="/registration" component={Identification}>
//             <Route path="/login" component={Login}/>
//             <IndexRoute component={Registration}/>
//         </Route>
//     </Router>
// )
//
// const studentRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={StudentDashboard}/>
//         </Route>
//     </Router>
// )
//
// const teacherRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={AdminApp}>
//             <Route path="/admin/profile" component={AdminProfile}/>
//
//             <IndexRoute component={AdminHome}/>
//         </Route>
//     </Router>
// )
//
// let route = loggedOutRouter;
// if (location.pathname == '/student') {
//     route = studentRouter;
// } else if (location.pathname == '/teacher') {
//     route = teacherRouter;
// }
ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);
