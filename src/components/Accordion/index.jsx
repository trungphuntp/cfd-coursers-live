import { Empty } from "antd";
import { useState } from "react";

const Accordion = ({ data = [], label = "" }) => {
    // useEffect(() => {
    //     function accordion() {
    //         $(document).on("click", ".accordion .accordion__content-title", function () {
    //             $(this).next().stop().slideToggle(200);
    //             $(this).closest(".accordion__content").toggleClass("active");
    //             $(this).closest(".accordion__content").siblings(".active").removeClass("active").find(".accordion__content-text").stop().slideUp(200);
    //         });
    //     }
    //     if (data?.length > 0) {
    //         accordion();
    //     }
    // }, [data]);
    const [activeID, setactiveID] = useState();

    const _onActiveClick = (e, id) => {
        e.stopPropagation();
        setactiveID(activeID === id ? "" : id);
    };

    return (
        <div className="accordion">
            {!!label && <h3 className="accordion__title label">{label} </h3>}
            {data?.length > 0 ? (
                data?.map((item, index) => {
                    const { id, title, description } = item || [];

                    return (
                        <div className={`accordion__content ${activeID === id ? "active" : ""}`} key={id || index}>
                            <div
                                className={`accordion__content-title`}
                                onClick={(e) => {
                                    return _onActiveClick(e, id);
                                }}
                            >
                                <h4>
                                    <strong>{title || ""}</strong>
                                </h4>
                            </div>

                            {typeof description === "object" ? (
                                description?.length > 1 && (
                                    <div className="accordion__content-text --transparent">
                                        {description?.map((item, index) => {
                                            return (
                                                <div className="item --lock" key={new Date().getTime() + index}>
                                                    <p>
                                                        <i>
                                                            <img
                                                                src="https://cfdcircle.vn/img/iconlock.svg"
                                                                alt="CFD Circle"
                                                            />
                                                        </i>
                                                        <span>{item || ""}</span>
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            ) : (
                                <div className="accordion__content-text">{description || ""}</div>
                            )}
                        </div>
                    );
                })
            ) : (
                <Empty description="Không có thông tin hiển thị" style={{ margin: "0 auto" }} />
            )}
        </div>
    );
};

export default Accordion;
