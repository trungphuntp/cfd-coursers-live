import CourseItem from "@/components/CourseItem";
import { useAuthContext } from "@/context/AuthContext";
import { Empty } from "antd";
import React from "react";

const MyCourses = () => {
    const { myCourses } = useAuthContext();

    return (
        <div className="tab__content-item" style={{ display: "block" }}>
            <div className="courses__list">
                {myCourses?.length <= 0 ? (
                    <Empty description={"Không có khóa học nào"} style={{ margin: "0 auto" }} />
                ) : (
                    <>
                        {myCourses?.map((item, index) => {
                            return <CourseItem key={item?.id || new Date().getTime + index} {...item?.course} />;
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
