import PATH from "@/constant/pathjs";
import { AuthServices } from "@/services/AuthServices";
import { OrderServices } from "@/services/OrderServices";
import methodToken from "@/utils/token";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [typeLogger, setTypeLogger] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [profile, setProfile] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [myPayment, setMyPayment] = useState([]);

    useEffect(() => {
        if (methodToken.get()) {
            // call api get profile
            handleProfile();
            // get api my courses
            handleGetMyCourses();

            // get api my payments
            handleGetMyPayment();
        }
    }, []);

    const _handleShowModal = (typeModal) => {
        setTypeLogger(typeModal || "");
    };

    const _handleCloseModal = () => {
        setTypeLogger("");
    };

    const handleLogin = async (loginData, callBack) => {
        // console.log(loginData);

        try {
            // xử lí payload đúng định dạng
            const payload = { ...loginData };

            // Xử lí api login
            const res = await AuthServices.login(payload);

            if (res?.data?.data) {
                const { token: accessToken, refreshToken } = res.data.data;
                methodToken.set({ accessToken, refreshToken });

                messageApi.success("Đăng nhập thành công!");
                handleProfile();
                _handleCloseModal?.();
            } else {
                messageApi.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            const errorInfor = error?.response?.data;
            if (errorInfor?.error === "Not Found") {
                messageApi.error("Email hoặc mật khâu không chính xác");
            }
            messageApi.error("Đăng nhập thất bại!");
        } finally {
            callBack?.();
        }
    };

    const handleRegister = async (registerData, callBack) => {
        const { name, email, password } = registerData;
        // payload
        const payload = {
            firstName: name,
            lastName: "",
            email,
            password,
        };

        // respond
        try {
            const res = await AuthServices.register(payload);

            if (res?.data?.data?.id) {
                handleLogin({
                    email,
                    password,
                });
                messageApi.success("Đăng ký thành công!");
            } else {
                messageApi.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            // console.log("error", error);
            const errorInfor = error?.response?.data;
            if (errorInfor?.error === "Forbidden") {
                messageApi.error("Email đã được đăng kí!");
            }
            messageApi.error("Đăng nhập thất bại!");
        } finally {
            callBack?.();
        }
    };

    const handleLogout = () => {
        methodToken.remove();
        navigate(PATH.HOME);
        messageApi.success("Tài khoản đã đăng xuất!");
    };

    // call API profile
    const handleProfile = async () => {
        try {
            const res = await AuthServices.getProfiles();
            if (res?.data?.data?.id) {
                setProfile(res.data.data);
            }
        } catch (error) {
            // console.log("error", error);

            handleLogout();
        }
    };

    // call API My Courses
    const handleGetMyCourses = async () => {
        try {
            const res = await OrderServices.getOrderCourses();

            if (res?.data?.data?.orders) {
                setMyCourses(res.data.data.orders);
            }
        } catch (error) {
            // console.log("error", error);
        }
    };

    // call API My Payment
    const handleGetMyPayment = async () => {
        try {
            const res = await OrderServices.getPaymentHistory();
            // console.log("my payment", res?.data?.data?.orders);

            if (res?.data?.data?.orders) {
                setMyPayment(res.data.data.orders);
            }
        } catch (error) {
            // console.log("error", error);
        }
    };

    const handleUpdateProfile = async (profileData) => {
        if (!profileData) return;
        try {
            const payload = {
                firstName: profileData?.firstName,
                lastName: profileData?.lastName || "",
                facebookURL: profileData?.facebookURL,
                website: profileData?.website,
                phone: profileData?.phone,
                introduce: profileData?.introduce,
            };

            const res = await AuthServices.updateProfiles(payload);

            if (res?.data?.data?.id) {
                setProfile(res.data.data);
                messageApi.success("Cập nhật thành công!");
            }
        } catch (error) {
            // console.log("error", error);
            messageApi.error("Cập nhật thất bại!");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                profile,
                handleLogout,
                _handleShowModal,
                _handleCloseModal,
                typeLogger,
                messageApi,
                handleLogin,
                handleRegister,
                handleGetMyCourses,
                handleGetMyPayment,
                myCourses,
                myPayment,
                handleUpdateProfile,
            }}
        >
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
