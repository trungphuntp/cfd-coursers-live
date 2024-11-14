import axiosInstance from "./utils/axiosInstance";

export const QuestionServices = {
    getQuestion(query = "") {
        return axiosInstance.get(`/api/v1/questions${query}`);
    },
    getQuestionById(id = "") {
        return axiosInstance.get(`/api/v1/questions${id}`);
    },
};
