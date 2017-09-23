import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component  {
    render() {
        return (
            <div>
                Hello World from Teacher App
            </div>
        );
    };

}


/********* CONNECTED COMPONENT ********/
export default connect()(App);
