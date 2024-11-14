import Accordion from "@/components/Accordion";
import { Empty } from "antd";
import React from "react";

const FaqSection = ({ questions, loading }) => {
    const faqGeneral = questions?.slice(0, 6);
    const faqResgister = questions?.slice(6);

    // monify accordion
    const faqGeneralAccordion = faqGeneral?.map((item) => {
        return {
            id: item?.id,
            title: item?.question,
            description: item?.answer,
        };
    });

    const faqResgisterAccordion = faqResgister?.map((item) => {
        return {
            id: item?.id,
            title: item?.question,
            description: item?.answer,
        };
    });

    return (
        <section className="faq --scpadding">
            <div className="container">
                <div className="faq__inner">
                    <div className="heading --noline --center">
                        <h2 className="heading__title title --t2">
                            Câu hỏi <span className="color--primary">thường gặp</span>
                        </h2>
                    </div>
                    <div className="faq__list">
                        {!loading && faqGeneralAccordion ? (
                            <Accordion data={faqGeneralAccordion} label="Thông tin chung" />
                        ) : (
                            <Empty description="Không có dữ liệu hiển thị" />
                        )}
                        {!loading && faqResgisterAccordion ? (
                            <Accordion data={faqResgisterAccordion} label="Đăng ký, thanh toán" />
                        ) : (
                            <Empty description="Không có dữ liệu hiển thị" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
