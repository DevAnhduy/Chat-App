import React from 'react';
import './AwesomeKeyFeatures.module.scss'

const AwesomeKeyFeatures = props => {
    return(
        <section>
            <div className="container">
                <div className="row mb-8">
                    <div className="col-lg-8 offset-lg-2 text-center">
                        <h2 className="display-4 mb-3">Một vài tính năng tuyệt vời</h2>
                        <p>Với <strong>FSNET</strong>, bạn sẽ có trải nghiệm tuyệt vời</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-devices mr-2"></i>
                                </div>
                                <h4 className="mb-4">Đa thiết bị</h4>
                                <p>FSNET được thiết kế với phương châm một cho tất cả, bất kỳ thiết bị nào cũng
                                tương thích với FSNET</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-account-multiple-plus mr-2"></i>
                                </div>
                                <h4 className="mb-4">Chat nhóm</h4>
                                <p>Chat cùng với nhóm bạn, đồng nghiệp, gia đình thông qua chức năng chat nhóm
                                    của FSNET</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-video-check mr-2"></i>
                                </div>
                                <h4 className="mb-4">Video Call</h4>
                                <p>Thực hiện các cuộc gọi video call để trải nghiệm cảm giác như được gặp trực tiếp với độ trễ
                                    thấp của FSNET</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-theme-light-dark mr-2"></i>
                                </div>
                                <h4 className="mb-4">Chế độ Dark &amp; Light</h4>
                                <p>Dễ dàng chuyển đổi nền của ứng dụng (Dark & Light) </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-upload mr-2"></i>
                                </div>
                                <h4 className="mb-4">Chia sẻ hình ảnh, tài liệu</h4>
                                <p>Dễ dàng chia sẻ hình ảnh, tài liệu,... Không lo bị mất file với FSNET</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card feature-block">
                            <div className="card-body">
                                <div className="feature-block-icon">
                                    <i className="mdi mdi-emoticon-wink-outline mr-2"></i>
                                </div>
                                <h4 className="mb-4">Hàng ngàn emoji</h4>
                                <p>FSNET cung cấp hàng ngàn emoji sẵn. Giúp thể hiện cảm xúc của người dùng
                                tốt nhất</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AwesomeKeyFeatures;