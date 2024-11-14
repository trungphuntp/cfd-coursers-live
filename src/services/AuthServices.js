import axiosInstance from "./utils/axiosInstance";

export const AuthServices = {
    login(payload = {}) {
        return axiosInstance.post(`/api/v1/customer/login`, payload);
    },
    register(payload = {}) {
        return axiosInstance.post(`/api/v1/customer/register`, payload);
    },

    getProfiles() {
        return axiosInstance.get(`/api/v1/customer/profiles`);
    },

    updateProfiles(payload = {}) {
        return axiosInstance.put(`/api/v1/customer/profiles`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
