import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero_image from '../../assets/images/homepage/hero-image.jpg';

const Hero = props => {
    useEffect(() => { 
        const hero_component = document.getElementById("hero");
        const aos_inits = hero_component.getElementsByClassName("aos-init");
        const hero_padding = 100
        for(let i = 0; i < aos_inits.length; i++) {
            aos_inits[i].classList.add("aos-animate")
        }
        if(hero_component.getBoundingClientRect().top <= -hero_padding){
            for (let i = 0; i < aos_inits.length; i++) {
                aos_inits[i].classList.remove("aos-animate")
            }
        }
    },[props.scroll_bot])
    return(
        <section className="py-8" id="hero" >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 text-center text-lg-left mb-5 mb-lg-0">
                        <div data-aos="zoom-in-right" className="aos-init">
                            <h1 className="hero-title">
                                <strong>FSNET</strong> là 1 trang web <span className="text-primary">ứng dụng chat</span>
                            </h1>
                            <p className="lead text-muted mb-5 mb-md-8">
                                <strong>
                                    FSNET được tạo ra để kết nối mọi người, bằng việc giao tiếp bằng văn bản, âm thanh, video.
                                    Việc giao tiếp với bạn bè, gia đình, đồng nghiệp,... chưa bao giờ đơn giản như thế.
                                </strong>
                            </p>
                            <Link to="/sign-up" className="btn btn-primary hover-animate mr-2">
                                Đăng kí miễn phí
                                <i className="mdi mdi-arrow-right ml-2 small"></i>
                            </Link>
                            <Link to="/sign-in" className="btn btn-light-primary hover-animate">
                                Đăng nhập
                                <i className="mdi mdi-arrow-right ml-2 small"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div data-aos="zoom-in-left" className="img-skewed img-skewed-left aos-init">
                            <img src={hero_image} className="img-fluid" alt="Hero image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;