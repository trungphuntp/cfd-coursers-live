import useQuery from "@/hooks/useQuery";
import { CourseServices } from "@/services/CourseServices";
import CallRegisterSection from "@/components/CallRegisterSection";
import CourseComingSection from "@/components/CourseComingSection";
import FaqSection from "@/components/FaqSection";
import FeaturedSection from "@/components/FeaturedSection";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import TeacherSection from "@/components/TeacherSection";
import TestimonialSection from "@/components/TestimonialSection";
import CoursesSection from "@/components/CoursesSection";
import { TeamServices } from "@/services/TeamServices";
import { QuestionServices } from "@/services/QuestionServices";
import useDebounce from "@/hooks/useDebounce";
import PageLoading from "@/components/PageLoading";

const HomePage = () => {
    // courses
    const {
        data: dataCourses,
        error: errorCourses,
        loading: loadingCourses,
    } = useQuery(CourseServices.getCourses);
    const courses = dataCourses?.courses;
    const comingCourses =
        courses?.filter((course) => {
            // return course.startDate && new Date(course.startDate) > new Date();
            return course.startDate && new Date(course.startDate) < new Date();
        }) || [];

    // teacher Team
    const {
        data: dataTeam,
        error: errorTeam,
        loading: loadingTeam,
    } = useQuery(TeamServices.getTeam);
    const teacherTeam = dataTeam?.teams || [];

    // question
    const {
        data: dataQuestion,
        error: errorQuestion,
        loading: loadingQuestion,
    } = useQuery(QuestionServices.getQuestion);
    const questions = dataQuestion?.questions || [];

    const apiloading = loadingQuestion || loadingTeam || loadingCourses;
    const pageloading = useDebounce(apiloading, 300);

    if (pageloading) {
        return <PageLoading />;
    }
    return (
        <main className="mainwrapper">
            <HeroSection />
            <CourseComingSection courses={comingCourses} loading={loadingCourses} />
            <CoursesSection courses={courses} loading={loadingCourses} />
            <TeacherSection teams={teacherTeam} loading={loadingTeam} />
            <FeaturedSection />

            {/* --------------------------------Testimonial-------------------------------- */}
            <TestimonialSection />
            {/* --------------------------------faq-------------------------------- */}
            <FaqSection questions={questions} loading={loadingQuestion} />

            <GallerySection />
            <CallRegisterSection />
        </main>
    );
};

export default HomePage;
