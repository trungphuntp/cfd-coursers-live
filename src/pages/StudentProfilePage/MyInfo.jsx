import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import REGEX from "@/constant/regexjs";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useRef, useState } from "react";

const MyInfo = () => {
    const { profile, handleUpdateProfile } = useAuthContext();
    const initialForm = useRef({
        firstName: "",
        lastName: "",
        facebookURL: "",
        website: "",
        introduce: "",
        phone: "",
        image: "",
        email: "",
    });

    const { firstName, email, profileImage, phone, facebookURL, introduce, website } = profile || {};

    const [form, setForm] = useState(initialForm?.current);

    const [error, setError] = useState({});

    // set value form
    useEffect(() => {
        if (profile) {
            const newForm = {
                firstName,
                facebookURL,
                website,
                introduce,
                phone,
                profileImage,
                email,
            };
            setForm(newForm);

            initialForm.current = newForm;
        }
    }, [profile]);

    // handle submit
    const _onSubmit = () => {
        // start validate
        const errorObject = {};

        // Kiểm tra rỗng
        // Kiểm tra regex

        // Name
        if (!!!form.firstName) {
            errorObject.firstName = "Vui lòng nhập Họ và tên";
        }

        //  Phone
        if (!!!form.phone) {
            errorObject.phone = "Vui lòng nhập Phone";
        } else if (!REGEX.phone.test(form.phone)) {
            errorObject.phone = "Phone không hợp lệ";
        }

        //  facebookURL
        if (
            form.facebookURL &&
            !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
                form.facebookURL
            )
        ) {
            errorObject.facebookURL = "Vui lòng chọn nhập đúng facebook URL";
        }

        //  website
        if (
            form.website &&
            !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
                form.website
            )
        ) {
            errorObject.website = "Vui lòng chọn nhập đúng website";
        }

        // Dù lỗi hay không lỗi cũng phải set Error
        setError(errorObject);

        // kiểm tra lỗi khi submit
        if (Object.keys(errorObject).length > 0) {
            console.log("submit error", errorObject);
        } else {
            handleUpdateProfile?.(form);
        }
    };

    const isChangeForm = JSON.stringify(initialForm?.current) !== JSON.stringify(form);

    const register = (registerField) => {
        return {
            name: registerField,
            value: form[registerField],
            error: error[registerField],
            onChange: (e) => {
                e.stopPropagation();
                setForm((prev) => {
                    return {
                        ...prev,
                        [registerField]: e?.target?.value,
                    };
                });
            },
        };
    };

    return (
        <div className="tab__content-item" style={{ display: "block" }}>
            <div className="form">
                <div className="form-container">
                    <Input label={"Họ và tên"} isRequire {...register("firstName")} placeholder={"Họ và tên"} />

                    <Input label={"Số điện thoại"} isRequire {...register("phone")} placeholder={"Số điện thoại"} />
                </div>
                <div className="form-container">
                    <Input label={"Email"} disabled isRequire {...register("email")} />
                    <Input label={"Mật khẩu"} disabled isRequire value={"12345568900"} type={"password"} />
                </div>
                <Input label={"Facebook UR"} {...register("facebookURL")} placeholder={"Facebook UR"} />
                <Input label={"Website"} {...register("website")} placeholder={"Website"} />
                <Input
                    label={"Giới thiệu bản thân"}
                    {...register("introduce")}
                    renderInput={(inputProps, error) => {
                        return <Textarea {...inputProps} error={error} />;
                    }}
                    placeholder={"Giới thiệu bản thân..."}
                />

                {/* <p className="noti">Cập nhận thông tin thành công</p> */}
                <div className="form-group">
                    <div className="btnsubmit">
                        <Button
                            style={{ width: "100%", pointerEvents: isChangeForm ? "all" : "none" }}
                            onClick={() => {
                                _onSubmit();
                            }}
                            disabled={!isChangeForm}
                        >
                            Lưu lại
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
