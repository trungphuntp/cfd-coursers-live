import { BASE_URL } from "@/constant/enviroments";
import axios from "axios";
import methodToken from "@/token";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${methodToken.get?.()?.accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Status code 200 - 299 (success)

        return response;
    },
    async (error) => {
        const orginalResquest = error.config;
        orginalResquest._refresh = true;

        // catch error 401 and 403
        if (
            error.response?.status === 401 ||
            error.response?.status === 403 ||
            (error.response?.status === 404 && !orginalResquest._refresh)
        ) {
            // accessToken is expired
            // refreshToken
            try {
                // xử lí payload
                const payload = {
                    refreshToken: methodToken?.get()?.refreshToken,
                };
                const res = await axiosInstance.put(`/api/v1/customer/refresh`, payload);

                if (res?.data?.data) {
                    const { token: accessToken, refreshToken } = res.data.data;
                    // save in client storage
                    methodToken.set({ accessToken, refreshToken });

                    // reset token config
                    orginalResquest.headers.Authorization = `bearer ${accessToken}`;
                }

                // recall resquest

                return axiosInstance(orginalResquest);
            } catch (error) {
                // falil refresh token or expired the refresh token
                methodToken.remove();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
