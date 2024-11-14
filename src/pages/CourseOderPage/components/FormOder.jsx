import Input from "@/components/Input";
import Select from "@/components/Select";
import REGEX from "@/constant/regexjs";
import { useAuthContext } from "@/context/AuthContext";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const FormOder = ({ tags, disabled }, ref) => {
    // ========= FORM ORDER ===========
    const { profile } = useAuthContext();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        type: "",
    });
    const [error, setError] = useState({});

    useEffect(() => {
        setForm((prev) => {
            return {
                ...prev,
                name: profile?.firstName,
                email: profile?.email,
                phone: profile?.phone,
                type: "",
            };
        });
    }, [profile]);

    // register
    const register = (fieldRegister) => {
        return {
            name: fieldRegister,
            error: error[fieldRegister],
            value: form[fieldRegister],
            onChange: (e) => {
                setForm((prev) => {
                    return {
                        ...prev,
                        [fieldRegister]: e.target.value,
                    };
                });
            },
        };
    };
    const _handleSubmit = () => {
        const errorObject = {};
        // Name
        if (!!!form.name) {
            errorObject.name = "Vui lòng nhập Họ và tên";
        }

        // Email
        // if (!!!form.email) {
        //     errorObject.email = "Vui lòng nhập Email";
        // } else if (!REGEX.email.test(form.email.trim())) {
        //     errorObject.email = "Email không hợp lệ";
        // }

        //  Phone
        if (!!!form.phone) {
            errorObject.phone = "Vui lòng nhập Phone";
        } else if (!REGEX.phone.test(form.phone)) {
            errorObject.phone = "Phone không hợp lệ";
        }

        //  Type
        if (!!!form.type) {
            errorObject.type = "Vui chọn hình thức học";
        }

        // Dù lỗi hay không lỗi cũng phải set Error
        setError(errorObject);

        // kiểm tra lỗi khi submit
        if (Object.keys(errorObject).length > 0) {
            console.log("submit error", errorObject);
            return null;
        } else {
            console.log("submit success", form);
            return form;
        }
    };

    const DefaultTypeValue = { value: "", label: "--" };
    const OptionTypeValue =
        tags?.map((tag) => {
            return {
                value: tag,
                label: tag,
            };
        }) || [];
    const TypeValue = [DefaultTypeValue, ...OptionTypeValue] || [];

    //  useImperativeHandle ORDER FORM
    useImperativeHandle(
        ref,
        () => {
            return {
                onSubmitForm: () => {
                    return _handleSubmit();
                },
                setForm,
            };
        },
        [form]
    );

    return (
        <form
            className="itemorder formorder"
            ref={ref}
            onSubmit={(e) => {
                e.preventDefault();
                _handleSubmit;
            }}
        >
            <h3 className="title --t3">Thông tin cá nhân</h3>
            <div className="boxorder">
                <div className="form">
                    <div className="form-container">
                        <Input label={"Họ và tên"} isRequire {...register("name")} disabled={disabled} />
                        <Input label={"Email"} disabled isRequire {...register("email")} />
                    </div>
                    <div className="form-container">
                        <Input label={"Số điện thoại"} isRequire {...register("phone")} disabled={disabled} />

                        <Input
                            label={"Hình thức học"}
                            isRequire
                            disabled={disabled}
                            {...register("type")}
                            renderInput={(inputProps) => {
                                return <Select options={TypeValue} {...inputProps} />;
                            }}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default forwardRef(FormOder);
