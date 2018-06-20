import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
class Home extends Component{
    render() {
        return (
            <div className="home-container">
                <Link to="/tab">tab</Link>
                <Link to="/test">test</Link>
                <Link to="/flex">flex</Link>
                <Link to="/marquee">marquee</Link>
                <Link to="/toast">toast</Link>
                <Link to="/pulldown">pulldown</Link>
            </div>
        )
    }
}
export default Home;