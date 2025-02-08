import ComponentLoading from "@/components/ComponentLoading";
import Input from "@/components/Input";
import { MODAL_TYPE } from "@/constant/general";
import REGEX from "@/constant/regexjs";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";

const AuthLogin = ({ handleSubmitForm }) => {
    const { _handleShowModal, handleLogin } = useAuthContext();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({});

    const [loading, setLoading] = useState(false);

    const _onChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    const _onSubmitLogin = (e) => {
        e.preventDefault();
        const errorObject = {};
        // Email
        if (!!!form.email) {
            errorObject.email = "Vui lòng nhập Email";
        }
        if (!REGEX.email.test(form.email)) {
            errorObject.email = "Email không hợp lệ";
        }

        // Password
        if (!!!form.password) {
            errorObject.password = "Vui lòng nhập Password";
        }

        // Dù lỗi hay không lỗi cũng phải set Error
        setError(errorObject);

        // kiểm tra lỗi khi submit
        if (Object.keys(errorObject).length > 0) {
            // console.log("submit error", errorObject);
            firstInputRef.current.focus();
        } else {
            setLoading(true);
            // console.log("submit success", form);
            handleSubmitForm?.(form);

            handleLogin?.(form, () => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
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
        <div className={`modal__wrapper-content mdlogin active`} style={{ position: "relative" }}>
            {loading && <ComponentLoading />}
            <div className="form__bottom">
                <p>Bạn chưa có tài khoản?</p>
                <div
                    className="color--primary btnmodal"
                    data-modal="mdregister"
                    onClick={(e) => {
                        e.stopPropagation();
                        _handleShowModal(MODAL_TYPE.register);
                    }}
                >
                    <strong>Đăng ký</strong>
                </div>
            </div>
            {/* <div className="social">
                <a className="btn btn--google" href="#">
                    <i>
                        <img src="img/icon-google.svg" alt="Google CFD" />
                    </i>
                    <span>Đăng nhập bằng Google</span>
                </a>
                <a className="btn btn--facebook" href="#">
                    <i>
                        <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
                    </i>
                    <span>Đăng nhập bằng Google</span>
                </a>
            </div> */}
            <span className="line">Hoặc</span>
            <form onSubmit={_onSubmitLogin} className="form">
                <Input
                    ref={firstInputRef}
                    label={"Email"}
                    placeholder="Email"
                    {...register("email")}
                />
                <Input
                    label={"Password"}
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                />

                {/* <div className="form__bottom">
                    <a className="color--primary" href="#">
                        Quên mật khẩu?
                    </a>
                </div> */}
                <button className="btn btn--primary form__btn-register" type="submit">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default AuthLogin;
