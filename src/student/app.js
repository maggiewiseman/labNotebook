import React from 'react';
import axios from 'axios';


class App extends React.Component {

    render() {
    return (
        <div>
               <nav>
                   <ul>
                       <li>Home</li>
                       <li>Courses</li>
                       <li>Gradebook</li>
                       <li>Account</li>
                       <li>Logout</li>
                   </ul>
               </nav>
               <sidebar>
                   <header>
                       Menu
                   </header>
                   <ul>
                       <li>Assignments</li>
                       <li><Link to="/teacher/courses">Courses</Link></li>
                       <li>Gradebook</li>
                       <li>Students</li>
                       <li>Messages</li>
                   </ul>
               </sidebar>
               {props.children}

        </div>


    )
}
}
