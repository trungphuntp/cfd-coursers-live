import axiosInstance from "@/utils/axiosInstance";

export const TeamServices = {
    getTeam(query = "") {
        return axiosInstance.get(`/api/v1/teams${query}`);
    },
    getTeamBySlug(slug = "") {
        return axiosInstance.get(`/api/v1/teams${slug}`);
    },
};
