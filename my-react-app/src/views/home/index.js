import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
class Home extends Component{
    render() {
        return (
            <div className="home-container">
                <Link to="/tab">tab</Link>
                <Link to="/test">test</Link>
                <Link to="/flex">flex</Link>
            </div>
        )
    }
}
export default Home;