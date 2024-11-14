import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";

const HeroSection = ({ tags, startDate, duration, oderLink, teacherInfo, price, image, name }) => {
    const { messageApi } = useAuthContext();
    const _onShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        messageApi.success("Copy link thành công!");
    };

    return (
        <section className="hero herodetail">
            <div className="hero__content">
                <div className="container">
                    <h3 className="category label --white">frontend</h3>
                    <h2 className="title --white">{name || ""}</h2>
                    <div className="infor">
                        <div className="infor__item">
                            <label className="label --white">Khai giảng</label>
                            <p className="title --t3 --white">{startDate || ""}</p>
                        </div>
                        <div className="infor__item">
                            <label className="label --white">Thời lượng</label>
                            <p className="title --t3 --white">{duration || 0} buổi</p>
                        </div>
                        <div className="infor__item">
                            <label className="label --white">Hình thức</label>
                            <p className="title --t3 --white">{tags?.join(" | ") || ""}</p>
                        </div>
                    </div>
                    {/* Chưa đăng ký */}
                    <Button link={oderLink} className="btn-regcourse">
                        Đăng ký
                    </Button>
                    {/* Đã đăng ký */}
                    {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
                </div>
            </div>
            <div className="hero__bottom">
                <div className="container-fluid">
                    <a href className="user">
                        <div className="user__img">
                            <img src={teacherInfo?.image || ""} alt="Avatar teacher" />
                        </div>
                        <p className="user__name --white">{teacherInfo?.name || ""}</p>
                    </a>
                    <div className="pricebox">
                        <p className="title --t3 --white">{price || 0}đ</p>
                    </div>
                    <a href="" onClick={_onShare} className="sharebox s--white">
                        Chia sẻ
                        <i>
                            <img src="https://cfdcircle.vn/img/iconshare.svg" alt="CFD Circle" />
                        </i>
                    </a>
                </div>
            </div>
            <div className="hero__background">
                <img className="hero__background-img" src={image || ""} alt="CFD Circle" />
            </div>
        </section>
    );
};

export default HeroSection;
