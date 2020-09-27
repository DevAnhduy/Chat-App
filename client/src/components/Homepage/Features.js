import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import feature_img from '../../assets/images/homepage/feature.svg';
import feature_img_2 from '../../assets/images/homepage/feature_2.svg';
import feature_img_3 from '../../assets/images/homepage/feature_3.svg';
import feature_img_4 from '../../assets/images/homepage/feature_4.svg';

const get_offsettop_features = () => {
    let arr_offsettop_features = [];
    const feature = document.getElementById("features");
    if(feature) {
        const features = feature.getElementsByClassName("feature");
        for (let i = 0; i < features.length; i++) {
            console.log(i)
            if (features[i].getBoundingClientRect().top <= 0)
                console.log("Check ",i)
            const height_feature = features[i].offsetHeight;
            arr_offsettop_features.push(features[i].offsetTop)
        }
        return arr_offsettop_features;
    }
}
const Features = props => {
    const feature = document.getElementById("features");
    useEffect(() => {
        if (feature) {
            const features = feature.getElementsByClassName("feature");
            for (let i = 0; i < features.length; i++) {
                const feature_height = features[i].offsetHeight;
                const feature_padding = 150;
                const feature_top = features[i].getBoundingClientRect().top;
                const feature_image = features[i].getElementsByClassName("aos-init")[0];
                if (feature_top <= feature_height + feature_padding && feature_top >= 0){
                    feature_image.classList.add("aos-animate")
                    break;
                }
                else {
                    feature_image.classList.remove("aos-animate")
                }
            }
        }
    },[props.scroll_bot])

    return (
        <section className="py-8" id="features">
            <div className="container">
                <div className="feature row align-items-center justify-content-between py-8">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <img data-aos="zoom-in-right" src={feature_img} className="img-fluid aos-init" alt="feature image" />
                    </div>
                    <div className="col-12 col-lg-5 offset-lg-1 order-1 order-lg-2 col-lg-5 text-center text-lg-left mb-5 mb-lg-0 ">
                        <h2 className="mb-4">Trò chuyện cùng bạn bè thật dễ dàng</h2>
                        <p className="lead mb-4">FSNET là một nơi được xây dựng để bạn có thể trò chuyện, chia sẻ và nói về những chuyện 
                                                 thường ngày mà không cần phải gặp trực tiếp</p>
                        <Link>
                            Xem thêm
                            <i className="mdi mdi-arrow-right ml-1 small"></i>
                        </Link>
                    </div>
                </div>
                <div className="feature row align-items-center justify-content-between py-8">
                    <div className="col-12 col-lg-6 text-center text-lg-left mb-5 mb-lg-0">
                        <h2 className="mb-4">Công nghệ tiên tiến và bảo mật</h2>
                        <p className="lead mb-4">Thực hiện các cuộc gọi và cuộc gọi video với độ trễ thấp giúp tạo cảm giác như bạn đang
                                                nói chuyện trực tiếp với bạn bè, người thân hoặc đồng nghiệp</p>
                        <Link>
                            Xem thêm
                            <i className="mdi mdi-arrow-right ml-1 small"></i>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <img data-aos="zoom-in-left" src={feature_img_2} className="img-fluid aos-init" alt="feature image" />
                    </div>
                </div>
                <div className="feature row align-items-center justify-content-between py-8">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <img data-aos="zoom-in-right" src={feature_img_3} className="img-fluid aos-init" alt="feature image" />
                    </div>
                    <div className="col-12 col-lg-5 offset-lg-1 order-1 order-lg-2 col-lg-5 text-center text-lg-left mb-5 mb-lg-0">
                        <h2 className="mb-4">Chức năng nhóm chat với nhiều tính năng tối ưu</h2>
                        <p className="lead mb-4">Dễ dàng tạo 1 nhóm chat chỉ thông qua một vài cú click chuột, tạo thuận tiện cho việc người dùng
                                                dùng muốn nói chuyện với 1 nhóm người. Cung cấp chức năng phân quyền cho thành viên trong nhóm chat, thiết
                                                lập kênh riêng tư và nhiều hơn thế nữa</p>
                        <Link>
                            Xem thêm
                            <i className="mdi mdi-arrow-right ml-1 small"></i>
                        </Link>
                    </div>
                </div>
                <div className="feature row align-items-center justify-content-between py-8">
                    <div className="col-12 col-lg-6 order-2 order-lg-1 col-lg-5 text-center text-lg-left mb-5 mb-lg-0">
                        <h2 className="mb-4">Chia sẻ file, hình ảnh dễ dàng</h2>
                        <p className="lead mb-4">Dễ dàng chia sẻ các tài liệu công việc, học tập hoặc ảnh hằng ngày </p>
                        <Link>
                            Xem thêm
                            <i className="mdi mdi-arrow-right ml-1 small"></i>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <img data-aos="zoom-in-left" src={feature_img_4} className="img-fluid aos-init" alt="feature image" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features