import axiosInstance from "@/utils/axiosInstance";

export const BlogServices = {
    getBlogs(query = "") {
        return axiosInstance.get(`/api/v1/blogs${query}`);
    },

    getBlogBySlug(slug = "") {
        return axiosInstance.get(`api/v1/blogs${slug}`);
    },

    getCategoriesBlog(query = "") {
        return axiosInstance.get(`/api/v1/blog-categories${query}`);
    },

    getCategoriesBlogBySlug(slug = "") {
        return axiosInstance.get(`/api/v1/blog-categories${slug}`);
    },
};
