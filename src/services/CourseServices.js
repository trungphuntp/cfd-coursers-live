import axiosInstance from "@/utils/axiosInstance";

export const CourseServices = {
    // query param
    getCourses(query = "") {
        return axiosInstance.get(`/api/v1/courses${query}`);
    },
    getCourseBySlug(slug = "") {
        return axiosInstance.get(`/api/v1/courses${slug}`);
    },
};
