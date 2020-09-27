import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/fsnet-logo.png';
import './Footer.scss'

const Footer = props => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <Link to="/" className="footer-logo">
                            <img src={logo} alt="FSNET Logo" />
                        </Link>
                        <p>FSNET là trang web ứng dụng chat</p>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5>Chăm sóc khách hàng</h5>
                        <ul>
                            <li><Link to="#">Chăm sóc khách hàng</Link></li>
                            <li><Link to="#">Điều khoản & Điều kiện</Link></li>
                            <li><Link to="#">Chính sách bảo mật</Link></li>
                            <li><Link to="#">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5>Về chúng tôi</h5>
                        <ul>
                            <li><Link to="#">Giới thiệu về FSNET</Link></li>
                            <li><Link to="#">Tuyển dụng</Link></li>
                            <li><Link to="#">Liên hệ với truyền thông</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <h5>Liên hệ với chúng tôi</h5>
                        <div className="mb-4">
                            <div className="mb-2">+84366901840</div>
                            <div> Số 1, đường ABC, ABC, ABC</div>
                        </div>
                        <div className="footer-social">
                            <h5>Theo dõi chúng tôi trên</h5>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <Link to="#" className="btn btn-facebook btn-floating btn-sm">
                                        <i className="mdi mdi-facebook"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#" className="btn btn-twitter btn-floating btn-sm">
                                        <i className="mdi mdi-twitter"></i>
                                    </Link>
                                </li>
                                <div className="list-inline-item">
                                    <Link to="#" className="btn btn-google btn-floating btn-sm">
                                        <i className="mdi mdi-google"></i>
                                    </Link>
                                </div>
                                <div className="list-inline-item">
                                    <Link to="#" className="btn btn-linkedin btn-floating btn-sm">
                                        <i className="mdi mdi-linkedin"></i>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom text-center">
                <div className="containter">
                    � 2020 - Bản quyền thuộc về <a href="https://www.facebook.com/anhduy.voca/">Anh Duy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer