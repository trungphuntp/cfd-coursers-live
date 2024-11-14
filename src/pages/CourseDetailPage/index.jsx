import PATH from "@/constant/pathjs";
import { ROLE } from "@/constant/roles";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { CourseServices } from "@/services/CourseServices";
import { QuestionServices } from "@/services/QuestionServices";
import { formatCurrency, formatDate } from "@/utils/format";
import { useEffect, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import ContentDetailSection from "./components/ContentDetailSection";
import CoursesSection from "./components/CoursesSection";
import FaqSection from "./components/FaqSection";
import FeaturedSection from "./components/FeaturedSection";
import HeadTop from "./components/HeadTop";
import HeroSection from "./components/HeroSection";

import PageLoading from "@/components/PageLoading";
import useDebounce from "@/hooks/useDebounce";
import "./styles.scss";

const CourseDetailPage = () => {
    const params = useParams();
    const { courseSlug } = params;

    const {
        data: courseDetailData,
        error: courseDetailError,
        loading: courseDetailLoading,
        execute,
    } = useMutation(CourseServices.getCourseBySlug);

    // get Detail info
    useEffect(() => {
        if (courseSlug) {
            execute(`/${courseSlug}` || "", {});
        }
    }, [courseSlug]);

    // courses
    const {
        data: coursesData,
        error: coursesError,
        loading: coursesLoading,
    } = useQuery(CourseServices.getCourses);

    // questions
    const {
        data: questionsData,
        error: questionsError,
        loading: questionsLoading,
    } = useQuery(QuestionServices.getQuestion);

    // ============ MONIFY DATA ============
    // question
    const questions = questionsData?.questions;

    // courses
    const courses = coursesData?.courses;

    const coursesRecommend = courses?.filter((course) => {
        return courseSlug !== course?.slug;
    });

    const oderLink = PATH.COURSE.ORDER_PATH + `/${courseSlug}`;

    const { teams, startDate, price } = courseDetailData || [];

    const monifyData = useMemo(() => {
        return {
            ...courseDetailData,
            teacherInfo: teams?.find((menber) => {
                return menber?.tags?.includes(ROLE.teacher);
            }),
            startDate: formatDate(startDate || ""),
            price: formatCurrency(price),
            oderLink,
        };
    }, [courseDetailData, teams, startDate, price, oderLink]);

    // const monifyData = {
    //     ...courseDetailData,
    //     teacherInfo: teams?.find((menber) => {
    //         return menber?.tags?.includes(ROLE.teacher);
    //     }),
    //     startDate: formatDate(startDate || ""),
    //     price: formatCurrency(price),
    //     oderLink,
    // };

    const loadingApi = questionsLoading || coursesLoading || courseDetailLoading;

    const loadingPages = useDebounce(loadingApi, 300);

    // loading
    if (loadingPages) {
        return <PageLoading />;
    }

    // return 404 if don't have slug
    if (!loadingPages) {
        if (!courseDetailData?.id) {
            return <Navigate to={"/404"} />;
        }
    }

    return (
        <>
            <HeadTop {...monifyData} />
            <main className="mainwrapper coursedetailpage">
                <HeroSection {...monifyData} />
                <ContentDetailSection {...monifyData} />
                <FeaturedSection />
                <FaqSection loading={loadingPages} questions={questions} />
                <CoursesSection loading={loadingPages} courses={coursesRecommend} />
            </main>
        </>
    );
};

export default CourseDetailPage;
