import React from 'react';
import Favorite_Left_Block from './Favorite_Left_Block';

const Favorite_Left_Sidebar = props => {
    return(
        <div id="favorites" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Yêu thích</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm yêu thích .." />
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps">
                <ul className="list-group list-group-flush users-list">
                    <Favorite_Left_Block avatar="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" name="Javascript" address="Test" />
                    <Favorite_Left_Block avatar="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" name="NodeJS" address="ZXCZXC" />
                    <Favorite_Left_Block avatar="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" name="Github" address="Test123" />
                </ul>
            </div>
        </div>
    )
}

export default Favorite_Left_Sidebar;