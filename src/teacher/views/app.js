import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';


class App extends React.Component  {
    render() {
        return (
            <div>
                Hello World from Teacher App
                {props.children}
            </div>
        );
    };

}


/********* CONNECTED COMPONENT ********/
export default connect()(App);
