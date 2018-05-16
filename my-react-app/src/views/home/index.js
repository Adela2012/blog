import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component{
    render() {
        return (
            <div>
                <Link to="/tab">tab</Link>
                <Link to="/test">test</Link>
            </div>
        )
    }
}
export default Home;