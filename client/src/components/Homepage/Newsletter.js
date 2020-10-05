import React from 'react';

const Newsletter = props => {
    return (
        <section className="py-8">
            <div className="container">
                <div className="col-lg-8 offset-lg-2 text-center">
                    <div className="mb-5">
                        <p className="text-primary text-uppercase">Tin mới</p>
                        <h2 className="display-5 mb-3">Đăng kí để nhận tin mới từ FSNET</h2>
                    </div>
                    <form action="#" method="post">
                        <div className="subscribe">
                            <input type="email" className="form-control rounded-pill" id="news-email" placeholder="Nhập email"></input>
                            <button className="btn btn-primary rounded-pill" type="submit">
                                Hoàn tất
                                <i className="mdi mdi-arrow-right ml-1 small"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Newsletter