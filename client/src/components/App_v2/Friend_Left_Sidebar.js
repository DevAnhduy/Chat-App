import React from 'react';
import Friend_Block from './Friend_Block';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Friend_Left_Sidebar = props => {
    return(
        <div id="friends" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Bạn bè</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm bạn bè"></input>
                    </div>
                </form>
            </div>
            <PerfectScrollbar className="left-sidebar-content">
                <ul className="list-group list-group-flush">
                    <Friend_Block avatar="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" name="Javascript" address="Test" />
                    <Friend_Block avatar="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" name="NodeJS" address="ZXCZXC" />
                    <Friend_Block avatar="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" name="Github" address="Test123" />
                    <Friend_Block avatar="https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg" name="DenoJS" address="Test123" />
                    <Friend_Block avatar="https://www.seekpng.com/png/detail/377-3772047_sass-logo.png" name="SASS" address="Test123" />
                    <Friend_Block avatar="https://kalvanaveen.github.io/WebDevelopmentResources.github.io/Images/Express-JS-min.png" name="ExpressJS" address="Test123" />
                    <Friend_Block avatar="https://www.iconninja.com/files/129/242/428/mobile-development-design-facebook-react-apps-framework-icon.png" name="ReactJS" address="123123" />
                    <Friend_Block avatar="https://d29fhpw069ctt2.cloudfront.net/icon/image/38568/preview.svg" name="GraphQL" last_message="123123" />
                    <Friend_Block avatar="https://eitguide.net/wp-content/uploads/2018/06/Electron.jpg" name="Electron" address="123123" />
                </ul>
            </PerfectScrollbar>
        </div>
    )
}

export default Friend_Left_Sidebar;