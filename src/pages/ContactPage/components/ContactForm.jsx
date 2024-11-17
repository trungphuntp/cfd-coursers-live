import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import REGEX from "@/constant/regexjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactForm = ({ handleSubmitForm }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        topic: "",
        content: "",
    });
    const [error, setError] = useState({});

    const _onChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };
    const _resetForm = () => {
        setForm({ email: "", password: "" });
    };
    const _onSubmit = () => {
        // start validate
        const errorObject = {};

        // Kiểm tra rỗng
        // Kiểm tra regex

        // Name
        if (!!!form.name) {
            errorObject.name = "Vui lòng nhập Họ và tên";
        }

        // Email
        if (!!!form.email) {
            errorObject.email = "Vui lòng nhập Email";
        } else if (!REGEX.email.test(form.email.trim())) {
            errorObject.email = "Email không hợp lệ";
        }

        //  Phone
        if (!!!form.phone) {
            errorObject.phone = "Vui lòng nhập Phone";
        } else if (!REGEX.phone.test(form.phone)) {
            errorObject.phone = "Phone không hợp lệ";
        }

        //  Topic
        if (!!!form.topic) {
            errorObject.topic = "Vui lòng chọn topic";
        }

        //  Content
        if (!!!form.content) {
            errorObject.content = "Vui lòng nhập content";
        }

        // Dù lỗi hay không lỗi cũng phải set Error
        setError(errorObject);

        // kiểm tra lỗi khi submit
        if (Object.keys(errorObject).length > 0) {
            // console.log("submit error", errorObject);
            firstInputRef.current.focus();
        } else {
            // console.log("submit success", form);
            handleSubmitForm?.(form);
            _resetForm();
            navigate("/");
        }
    };

    // register
    const register = (registerField) => {
        return {
            name: registerField,
            value: form?.[registerField],
            error: error?.[registerField],
            onChange: _onChange,
        };
    };

    // ref first input
    const firstInputRef = useRef();
    useEffect(() => {
        if (firstInputRef?.current) {
            firstInputRef.current.focus();
        }
    }, [firstInputRef]);
    return (
        <div className="form">
            <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
            <Input
                ref={firstInputRef}
                label={"Họ và tên"}
                isRequire
                placeholder="Họ và tên"
                {...register("name")}
            />
            <Input label={"Email"} isRequire placeholder="Email" {...register("email")} />
            <Input label={"Phone"} isRequire placeholder="Phone" {...register("phone")} />

            {/* select */}
            <Input
                label={"Chủ đề cần hỗ trợ"}
                isRequire
                {...register("topic")}
                renderInput={(inputProps) => {
                    return (
                        <Select
                            {...inputProps}
                            className="select"
                            options={[
                                {
                                    value: "",
                                    label: "--",
                                },
                                {
                                    value: "react",
                                    label: "ReactJs",
                                },
                                {
                                    value: "responsive",
                                    label: "Web Responsive",
                                },
                            ]}
                        />
                    );
                }}
            />

            {/* textarea Input  */}
            <Input
                label={"Nội dung"}
                isRequire
                error={error?.content}
                {...register("content")}
                renderInput={(inputProps) => {
                    return <Textarea {...inputProps} />;
                }}
            />

            <div className="btncontrol">
                <Button onClick={_onSubmit}>Gửi</Button>
            </div>
        </div>
    );
};

export default ContactForm;
