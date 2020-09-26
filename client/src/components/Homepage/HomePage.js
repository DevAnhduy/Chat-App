import React from 'react';
import Navbar from './Navbar.js';
import Hero from './Hero.js';
import Features from './Features.js';
import './Homepage.scss';

const HomePage = props => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Features />
        </div>
    )
}

export default HomePage;