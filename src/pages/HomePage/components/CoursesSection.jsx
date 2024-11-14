import Button from "@/components/Button";
import CourseItem from "@/components/CourseItem";
import PATH from "@/constant/pathjs";
import { Empty } from "antd";

const CoursesSection = ({ courses = [], loading = false }) => {
    return (
        <section className="courses">
            <div className="container">
                <div className="heading">
                    <h2 className="heading__title title --t2">
                        Tất cả <span className="color--primary">khóa học</span>
                    </h2>
                </div>
                {!loading && courses?.length === 0 ? (
                    <Empty description="Không có khóa học nào" style={{ margin: "0 auto" }} />
                ) : (
                    <>
                        <div className="courses__list">
                            {courses.map((course, index) => {
                                return <CourseItem key={courses?.id || index} {...course} />;
                            })}
                        </div>
                        <div className="courses__btnall">
                            <Button link={PATH.COURSE.PATH} variant="grey">
                                Tất cả khoá học
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;
