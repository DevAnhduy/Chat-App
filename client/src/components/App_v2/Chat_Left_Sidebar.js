import React from 'react';
import Chat_Block from './Chat_Block.js';
import $ from 'jquery';
import Slider from 'react-slick';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Chat_Left_Sidebar = props => {
    const story_slide_settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    }
    return (
        <div id="chats" className="left-sidebar open" >
            <div className="left-sidebar-header">
                <div className="story-block">
                    <h4 className="mb-4">Stories</h4>
                    <Slider {...story_slide_settings} className="story-items" >
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" className="rounded-circle" alt="image" />
                                <span className="story-content">NodeJS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="image" />
                                <span className="story-content">Javascript</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" className="rounded-circle" alt="image" />
                                <span className="story-content">Github</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar">
                                <img src="https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg" className="rounded-circle" alt="image" />
                                <span className="story-content">DenoJS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <span className="avatar-title bg-info rounded-circle">A</span>
                                <span className="story-content">Atom</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-success">
                                <img src="https://www.seekpng.com/png/detail/377-3772047_sass-logo.png" className="rounded-circle" alt="image" />
                                <span className="story-content">SASS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar">
                                <img src="https://kalvanaveen.github.io/WebDevelopmentResources.github.io/Images/Express-JS-min.png" className="rounded-circle" alt="image" />
                                <span className="story-content">ExpressJS</span>
                            </a>
                        </div> 
                    </Slider>
                </div>
                <form>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm bạn bè, phòng chat,..."></input>
                    </div>
                </form>
            </div>
            <PerfectScrollbar className="left-sidebar-content">
                <Chat_Block avatar="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" name="Javascript" last_message="Test"  />
                <Chat_Block avatar="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" name="NodeJS" last_message="ZXCZXC" />
                <Chat_Block avatar="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" name="Github" last_message="Test123" />
                <Chat_Block avatar="https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg" name="DenoJS" last_message="Test123" />
                <Chat_Block avatar="https://www.seekpng.com/png/detail/377-3772047_sass-logo.png" name="SASS" last_message="Test123" />
                <Chat_Block avatar="https://kalvanaveen.github.io/WebDevelopmentResources.github.io/Images/Express-JS-min.png" name="ExpressJS" last_message="Test123" />
                <Chat_Block avatar="https://www.iconninja.com/files/129/242/428/mobile-development-design-facebook-react-apps-framework-icon.png" name="ReactJS" last_message="123123" />
                <Chat_Block avatar="https://d29fhpw069ctt2.cloudfront.net/icon/image/38568/preview.svg" name="GraphQL" last_message="123123" />
                <Chat_Block avatar="https://eitguide.net/wp-content/uploads/2018/06/Electron.jpg" name="Electron" last_message="123123" />
            </PerfectScrollbar>
        </div>
    )
}

export default Chat_Left_Sidebar;