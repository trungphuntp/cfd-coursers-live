import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PATH from "@/constant/pathjs";

// import PageLoading from "@/components/PageLoading";
// import MainLayout from "@/layouts/MainLayout";
// import HomePage from "@/pages/HomePage";
// import BlogPage from "@/pages/BlogPage";
// import BlogDetailPage from "@/pages/BlogDetailPage";
// import AboutPage from "@/pages/AboutPage";
// import ContactPage from "@/pages/ContactPage";
// import ChangePasswordPage from "@/pages/ChangePasswordPage";
// import CourseDetailPage from "@/pages/CourseDetailPage";
// import CoursePage from "@/pages/CoursePage";
// import PrivateRoute from "@/components/PrivateRoute";
// import CourseOderPage from "@/pages/CourseOderPage";
// import StudentProfilePage from "@/pages/StudentProfilePage";
// import MyCourses from "@/pages/StudentProfilePage/MyCourses";
// import MyInfo from "@/pages/StudentProfilePage/MyInfo";
// import MyMethod from "@/pages/StudentProfilePage/MyMethod";
// import PaymentMethodPage from "@/pages/PaymentMethodPage";
// import PrivacyPage from "@/pages/PrivacyPage";
// import PageNotFound from "@/pages/PageNotFound";

const PageLoading = lazy(() => import("./components/PageLoading"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

const AboutPage = lazy(() => import("./pages/AboutPage"));

const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const CourseOderPage = lazy(() => import("./pages/CourseOderPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfilePage"));
const MyInfo = lazy(() => import("./pages/StudentProfilePage/MyInfo"));
const MyCourses = lazy(() => import("./pages/StudentProfilePage/MyCourses"));
const MyMethod = lazy(() => import("./pages/StudentProfilePage/MyMethod"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
// const ReduxPage = lazy(() => import("@/pages/TestReduxPage"));

function App() {
    return (
        <Suspense fallback={<PageLoading />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {/* test reduc */}
                        {/* <Route path={"/testpage"} element={<ReduxPage />} /> */}

                        {/* home */}
                        <Route index element={<HomePage />} />

                        {/* Blog */}
                        <Route path={PATH.BLOG.PATH} element={<BlogPage />} />
                        <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />

                        {/* About */}
                        <Route path={PATH.ABOUT} element={<AboutPage />} />

                        {/* Contact  */}
                        <Route path={PATH.CONTACT} element={<ContactPage />} />

                        {/* change pass word */}
                        <Route path="/change-password" element={<ChangePasswordPage />} />

                        {/* Courses */}
                        <Route path={PATH.COURSE.DETAIL} element={<CourseDetailPage />} />
                        <Route path={PATH.COURSE.PATH} element={<CoursePage />} />

                        {/* private  */}
                        <Route element={<PrivateRoute />}>
                            {/* course by slug */}
                            <Route path={PATH.COURSE.ORDER} element={<CourseOderPage />} />

                            {/*  Student Profile  */}
                            <Route path={PATH.PROFILE.PATH} element={<StudentProfilePage />}>
                                <Route index element={<MyInfo />} />
                                <Route path={PATH.PROFILE.COURSE} element={<MyCourses />} />
                                <Route path={PATH.PROFILE.METHOD} element={<MyMethod />} />
                            </Route>
                        </Route>

                        {/* Payment Method  */}
                        <Route path={PATH.PAYMENT} element={<PaymentMethodPage />} />

                        {/*  Privacy */}
                        <Route path={PATH.PRIVACY} element={<PrivacyPage />} />

                        {/* 404 Page */}
                        <Route path="/404" element={<PageNotFound />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
export default App;
