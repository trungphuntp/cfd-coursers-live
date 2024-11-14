import CourseItem from "@/components/CourseItem";
import { Empty } from "antd";
import React from "react";

const CoursesSection = ({ courses, loading }) => {
    return (
        <section className="courses">
            <div className="container">
                <div className="heading --center --noline">
                    <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
                </div>

                {loading &&
                    Array(3)
                        .fill("")
                        .map(_, (index) => {
                            return (
                                <div className="courses__list">
                                    <Skeleton active avatar />
                                    <br />
                                    <Skeleton active />
                                </div>
                            );
                        })}
                {!loading && courses?.length > 0 && (
                    <div className="courses__list">
                        {courses?.map((course, index) => {
                            return <CourseItem {...course} key={course?.id || index} />;
                        })}
                    </div>
                )}
                {!loading && courses?.length === 0 && <Empty description="Không có khóa học nào" />}
            </div>
        </section>
    );
};

export default CoursesSection;
