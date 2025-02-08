import Button from "@/components/Button";

import FormOder from "./components/FormOder";
import InforOder from "./components/InforOder";
import PaymentOder from "./components/PaymentOder";

import PATH from "@/constant/pathjs";
import { ROLE } from "@/constant/roles";
import { useAuthContext } from "@/context/AuthContext";
import useMutation from "@/hooks/useMutation";
import { CourseServices } from "@/services/CourseServices";
import { OrderServices } from "@/services/OrderServices";
import { formatCurrency } from "@/utils/format";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseOderPage = () => {
    const { messageApi, handleGetMyPayment, handleGetMyCourses } = useAuthContext();
    const navigate = useNavigate();
    // ========= CALL API BY SLUG ===========
    const { courseSlug } = useParams();

    const {
        data: CourseData,
        error: CourseError,
        loading: CourseLoading,
        execute: getCourseData,
    } = useMutation(CourseServices.getCourseBySlug);

    useEffect(() => {
        if (!!courseSlug) {
            getCourseData(`/${courseSlug}`);
        }
    }, [courseSlug]);

    const { teams, price } = CourseData || {};

    const CoursesInforProps = {
        ...CourseData,
        teacherInfor: teams?.find((menber) => {
            return menber?.tags?.includes(ROLE.teacher);
        }),
        price: formatCurrency(price),
    };
    // ========= REF FORM ===========
    const refOrderForm = useRef();

    // ========= REF PAYMENT METHOD ===========
    const refOrderMethodPayment = useRef();

    // ========= END  ===========
    const { loading: loadingOder, execute: executeOder } = useMutation(
        OrderServices.postOrderCourses
    );

    const _onOrder = useCallback(() => {
        const profileData = refOrderForm?.current?.onSubmitForm();
        if (!profileData) return;

        if (refOrderMethodPayment?.current?.selectPaymentMedthod) {
            // payload
            const { name: nameForm, phone: phoneForm, type: typeForm } = profileData;
            const payload = {
                name: nameForm.trim(),
                phone: phoneForm.trim(),
                course: CourseData?.id,
                type: typeForm,
                paymentMethod: refOrderMethodPayment.current.selectPaymentMedthod,
            };
            console.log(payload);

            // console.log("payload", payload);
            // CALL API
            executeOder?.(payload, {
                onSuccess: async () => {
                    messageApi.success("Đăng kí thành công!");
                    navigate(PATH.PROFILE.COURSE);
                    await handleGetMyPayment();
                    await handleGetMyCourses();
                },
                onFail: () => {
                    messageApi.error("Đăng kí thất bại!");
                },
            });
        } else {
            messageApi.error("Vui lòng chọn phương thức thanh toán!");
        }
    }, [refOrderMethodPayment, refOrderForm, CourseData]);

    // ========= Already Coursers ===========

    const { myCourses } = useAuthContext();

    const alreadyCourse = myCourses?.find((item) => {
        return item?.course?.slug === courseSlug;
    });

    const isAlreadyCourse = !!alreadyCourse;

    useEffect(() => {
        if (isAlreadyCourse) {
            refOrderForm?.current?.setForm((pre) => {
                return {
                    ...pre,
                    name: alreadyCourse?.name || "",
                    phone: alreadyCourse?.phone || "",
                    type: alreadyCourse?.type || "",
                };
            });
            refOrderMethodPayment?.current?.setSelectPaymentMedthod(alreadyCourse?.paymentMethod);
        }
    }, [JSON.stringify(alreadyCourse)]);

    return (
        <main className="mainwrapper --ptop">
            <section className="sccourseorder">
                <div className="container small">
                    <InforOder {...CoursesInforProps} />
                    <FormOder
                        {...CoursesInforProps}
                        disabled={isAlreadyCourse}
                        ref={refOrderForm}
                    />
                    <PaymentOder ref={refOrderMethodPayment} disabled={isAlreadyCourse} />
                    {/* addclass --processing khi bấm đăng ký */}
                    <Button onClick={_onOrder} disabled={isAlreadyCourse} style={{ width: "100%" }}>
                        {loadingOder ? (
                            <svg
                                style={{ width: " 100%", height: " 100%" }}
                                version="1.1"
                                id="L9"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 100 100"
                                enableBackground="new 0 0 0 0"
                                xmlSpace="preserve"
                            >
                                <path
                                    fill="#fff"
                                    d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="rotate"
                                        dur="1s"
                                        from="0 50 50"
                                        to="360 50 50"
                                        repeatCount="indefinite"
                                    />
                                </path>
                            </svg>
                        ) : isAlreadyCourse ? (
                            <span>Đã Đăng ký</span>
                        ) : (
                            <span>Đăng ký khoá học</span>
                        )}
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default CourseOderPage;
