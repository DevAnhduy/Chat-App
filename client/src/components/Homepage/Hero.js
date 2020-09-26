import React from 'react';
import { Link } from 'react-router-dom';
import hero_image from '../../assets/images/homepage/hero-image.jpg';
import './Hero.scss';

const Hero = props => {
    return(
        <section className="py-8" >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 text-center text-lg-left mb-5 mb-lg-0">
                        <div data-aos="zoom-in-right" className="aos-init aos-animate">
                            <h1 className="hero-title">
                                <strong>FSNET</strong> là 1 trang web <span className="text-primary">ứng dụng chat</span>
                            </h1>
                            <p className="lead text-muted mb-5 mb-md-8">
                                <strong>
                                    FSNET được tạo ra để kết nối mọi người, bằng việc giao tiếp bằng văn bản, âm thanh, video.
                                    Việc giao tiếp với bạn bè, gia đình, đồng nghiệp,... chưa bao giờ đơn giản như thế.
                                </strong>
                            </p>
                            <Link to="/register" className="btn btn-primary hover-animate mr-2">
                                Đăng kí miễn phí
                                <i className="mdi mdi-arrow-right ml-2 small"></i>
                            </Link>
                            <Link to="/login" className="btn btn-light-primary hover-animate">
                                Đăng nhập
                                <i className="mdi mdi-arrow-right ml-2 small"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div data-aos="zoom-in-left" className="img-skewed img-skewed-left aos-init aos-animate">
                            <img src={hero_image} className="img-fluid" alt="Hero image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;