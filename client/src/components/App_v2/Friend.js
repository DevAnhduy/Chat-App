import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Friend_Block = props => {
    return(
        <li className="list-group-item">
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="Friend avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>{props.address}</p>
                </div>
                <div className="users-list-action">
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a data-toggle="dropdown"><i className="mdi mdi-dots-horizontal"></i></a>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item">Trò chuyện</a>
                            <a className="dropdown-item">Thông tin cá nhân</a>
                            <a className="dropdown-item">Chặn</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
const Friend_Main = props => {
    return (
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
    )
}

export { Friend_Block, Friend_Main };