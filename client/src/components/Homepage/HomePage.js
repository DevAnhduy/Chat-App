import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import Hero from './Hero.js';
import Features from './Features.js';
import AwesomeKeyFeatures from './AwesomeKeyFeatures.js';
import Newsletter from './Newsletter.js';
import Footer from './Footer.js';
import './Homepage.scss';

const HomePage = props => {
    const [scroll_bot, set_scroll_bot] = useState(0);
    const window_height = window.innerHeight;

    useEffect(() => {
        const onScroll = e => {
            set_scroll_bot(e.target.documentElement.scrollTop + window_height);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scroll_bot]);
    return (
        <div className="homepage" style={{paddingTop:100}}>
            <Navbar />
            <Hero scroll_bot={scroll_bot} />
            <Features scroll_bot={scroll_bot} />
            <AwesomeKeyFeatures />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default HomePage;