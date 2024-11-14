import CourseItem from "@/components/CourseItem";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { CourseServices } from "@/services/CourseServices";
import { Empty, Skeleton } from "antd";
import React from "react";

const CoursePage = () => {
    const { data: dataCourses, error: errorCourses, loading: loadingCourses } = useQuery(CourseServices.getCourses);
    const courses = dataCourses?.courses || [];

    const loadingPage = useDebounce(loadingCourses, 300);

    return (
        <main className="mainwrapper courses --ptop">
            <div className="container">
                <div className="textbox">
                    <div className="container">
                        <h2 className="title --t2">Tất cả khoá học</h2>
                    </div>
                </div>
                <div className="courses__list">
                    {loadingPage &&
                        Array(4)
                            .fill(" ")
                            .map((_, index) => {
                                return (
                                    <div className="courses__list-item">
                                        <Skeleton active avatar />
                                        <br />
                                        <Skeleton active />
                                    </div>
                                );
                            })}

                    {courses?.length === 0 && !loadingPage && (
                        <Empty description="Không có khóa học nào " style={{ margin: "0 auto" }} />
                    )}
                    {courses?.length > 0 &&
                        !loadingPage &&
                        courses?.map((course, index) => {
                            return <CourseItem {...course} key={course?.id || index} />;
                        })}
                </div>
            </div>
        </main>
    );
};

export default CoursePage;
