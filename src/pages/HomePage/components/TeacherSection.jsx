import { Empty } from "antd";
import React, { useEffect } from "react";

const TeacherSection = ({ teams, loading }) => {
    useEffect(() => {
        function teacherSlider() {
            let courseComingSlider = $(".teacher .teacher__list .teacher__list-inner");
            courseComingSlider.flickity({
                cellAlign: "left",
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                dragThreshold: 0,
            });

            $(".teacher .control .control__next").on("click", function (e) {
                e.preventDefault();
                courseComingSlider.flickity("next");
            });
            $(".teacher .control .control__prev").on("click", function (e) {
                e.preventDefault();
                courseComingSlider.flickity("previous");
            });
            courseComingSlider.flickity("resize");
        }
        if (teams?.length > 0) {
            teacherSlider();
        }
    }, [teams]);

    return (
        <section className="teacher --scpadding">
            <div className="container">
                <div className="heading">
                    <h2 className="heading__title title --t2">
                        Đội Ngũ <span className="color--primary">CFD Circle</span>
                    </h2>
                    <div className="heading__content">
                        <p className="text">
                            Đội ngủ giảng viên và mentor tâm huyết nhiều kinh nghiệm được tích luỹ từ những dự án thực tế sẽ đồng hành cùng bạn xuyên
                            suốt quá trình học và con đường phát triển sự nghiệp.
                        </p>
                        <div className="control">
                            <div className="control__prev">
                                <img src="img/icon-btn-control.svg" alt="icon prev" />
                            </div>
                            <div className="control__next">
                                <img src="img/icon-btn-control.svg" alt="icon next" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!loading && teams?.length === 0 ? (
                <Empty description="Không có thành viên nào" />
            ) : (
                <div className="teacher__list">
                    <div className="container">
                        <div className="teacher__list-inner">
                            {teams?.map((menber, index) => {
                                return (
                                    <div className="teacher__list-item" key={menber?.id || index}>
                                        <div className="img">
                                            <img src={menber.image || ""} alt="Giảng viên CFD" />
                                        </div>
                                        <div className="info">
                                            <p className="label">{menber.jobTitle || ""}</p>
                                            <h3 className="title --t3">{menber.name || ""}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TeacherSection;
