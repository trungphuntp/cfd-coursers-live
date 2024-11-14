import axiosInstance from "@/utils/axiosInstance";

export const GalleryServices = {
    getGallery(query = "") {
        return axiosInstance.get(`/api/v1/galleries${query}`);
    },
    getGalleryBySlug(slug = "") {
        return axiosInstance.get(`/api/v1/galleries${slug}`);
    },
};
