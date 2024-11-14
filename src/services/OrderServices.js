import axiosInstance from "./utils/axiosInstance";

export const OrderServices = {
    getPaymentHistory(query = "") {
        return axiosInstance.get(`/api/v1/orders/me${query}`);
    },
    getOrderCourses(query = "") {
        return axiosInstance.get(`/api/v1/orders/courses/me${query}`);
    },
    postOrderCourses(payload = {}) {
        return axiosInstance.post(`/api/v1/orders`, payload);
    },
};
