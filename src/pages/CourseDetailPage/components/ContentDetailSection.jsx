import Accordion from "@/components/Accordion";
import { formatDate } from "@/utils/format";
import React from "react";

const ContentDetailSection = ({ description, schedule, startDate, content, required, teams }) => {
    // monify accordion
    const monifyAccordion = content?.map((item, index) => {
        return {
            id: item?.id || new Date().getTime() + index,
            title: item?.title,
            description: item?.description,
        };
    });

    return (
        <section className="contentdetail">
            <div className="content">
                <div className="container">
                    <div className="contentrow ctintro">
                        <h3 className="contentrow__title title --t3">Giới thiệu</h3>
                        <div className="contenteditor">
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>
                        <div className="videowrap">
                            <iframe
                                title="YouTube video player"
                                src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                                width={560}
                                height={315}
                                frameBorder={0}
                                allowFullScreen="allowfullscreen"
                            />
                        </div>
                    </div>
                    <div className="contentrow ctschedule">
                        <h3 className="contentrow__title title --t3">Lịch học</h3>
                        <div className="ctschedule__box">
                            <div className="info">
                                <div className="labeltext">
                                    <span className="label --blue">Khai giảng</span>
                                    <p className="title --t3">{startDate}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Ngày học</span>
                                    <p className="title --t3">{schedule?.days || ""}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Thời gian</span>
                                    <p className="title --t3">{schedule?.time || ""}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Địa điểm</span>
                                    <p className="title --t3">{schedule?.address || ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contentrow ctlession">
                        <h3 className="contentrow__title title --t3">Nội dung khoá học</h3>
                        <Accordion data={monifyAccordion} />
                    </div>
                    <div className="contentrow ctrequest">
                        <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
                        <div className="ctrequest__content">
                            {required &&
                                required?.map((item, index) => {
                                    return <p key={item?.id || new Date().getTime + index}>{item || ""}</p>;
                                })}
                        </div>
                    </div>
                    <div className="contentrow ctteacher">
                        <h3 className="contentrow__title title --t3">Giảng viên</h3>
                        <div className="ctteacher__content">
                            {teams &&
                                teams?.map((menber, index) => {
                                    return (
                                        <div className="itemteacher" key={menber?.id || new Date().getTime + index}>
                                            <div className="itemteacher__avatar">
                                                <img src={menber?.image || ""} alt="CFD Circle" />
                                            </div>
                                            <div className="itemteacher__info">
                                                <div className="itemteacher__info-name">
                                                    <p className="title --t3">{menber?.name || ""}</p>
                                                    <span className="label badge --teacher">{menber?.tags || ""}</span>
                                                </div>
                                                <h5 className="itemteacher__info-pos label">
                                                    {menber?.jobTitle || ""}
                                                </h5>
                                                <p className="itemteacher__info-des">{menber?.description || ""}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentDetailSection;
