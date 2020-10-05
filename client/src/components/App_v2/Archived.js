import React from 'react';
import { Friend_Block } from './Friend';

const Archived_Main = props => {
    return(
        <div id="archived" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Archived</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Search archived" />
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps">
                <ul className="list-group list-group-flush users-list">
                    <Friend_Block avatar="https://www.iconninja.com/files/129/242/428/mobile-development-design-facebook-react-apps-framework-icon.png" name="ReactJS" address="123123" />
                    <Friend_Block avatar="https://d29fhpw069ctt2.cloudfront.net/icon/image/38568/preview.svg" name="GraphQL" last_message="123123" />
                    <Friend_Block avatar="https://eitguide.net/wp-content/uploads/2018/06/Electron.jpg" name="Electron" address="123123" />
                </ul>
            </div>
        </div>
    )
}

export { Archived_Main }