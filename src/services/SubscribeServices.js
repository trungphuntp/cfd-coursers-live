import axiosInstance from "@/utils/axiosInstance";

export const SubscribeService = {
    createSubscribe(payload = {}) {
        return axiosInstance.post(`/api/v1/subscribes${payload}`);
    },
};
