import ComponentLoading from "@/components/ComponentLoading";
import Input from "@/components/Input";
import { MODAL_TYPE } from "@/constant/general";
import PATH from "@/constant/pathjs";
import REGEX from "@/constant/regexjs";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AuthRegister = () => {
    const { _handleShowModal, handleRegister } = useAuthContext();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const _handleOnChange = (e) => {
        const { value, name } = e.target;
        setForm((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const _handleOnSubmit = (e) => {
        e.preventDefault();

        const objectError = {};

        if (!!!form.name) {
            objectError.name = "Vui lòng nhập Họ và Tên";
        }

        if (!!!form.email) {
            objectError.email = "Vui lòng nhập email";
        } else if (!REGEX?.email?.test(form.email)) {
            objectError.email = "Email không hợp lệ";
        }

        if (!!!form.password) {
            objectError.password = "Vui lòng nhập mật khẩu";
        }

        if (!!!form.passwordConfirm) {
            objectError.passwordConfirm = "Vui lòng xác nhận mật khẩu";
        } else if (form.password !== form.passwordConfirm) {
            objectError.passwordConfirm = "Xác nhận mật khẩu không khớp";
        }

        setError(objectError);
        if (Object.keys(objectError).length > 0) {
            // console.log("submit error", objectError);
            firstInputRef.current.focus();
        } else {
            setLoading(true);
            // console.log("submit success", form);

            handleRegister(form, () => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
        }
    };

    const register = (registerField) => {
        return {
            name: registerField,
            error: error?.[registerField],
            value: form?.[registerField],
            onChange: _handleOnChange,
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
        <div
            className={`modal__wrapper-content mdregister active`}
            style={{ position: "relative" }}
        >
            {loading && <ComponentLoading />}
            <div className="form__bottom">
                <p>Bạn đã có tài khoản?</p>
                <div
                    className="color--primary btnmodal"
                    data-modal="mdlogin"
                    onClick={(e) => {
                        e.stopPropagation();
                        _handleShowModal(MODAL_TYPE.login);
                    }}
                >
                    <strong>Đăng nhập</strong>
                </div>
            </div>
            {/* <div className="social">
                <a className="btn btn--google" href="#">
                    <i>
                        <img src="img/icon-google.svg" alt="Google CFD" />
                    </i>
                    <span>Đăng ký bằng Google</span>
                </a>
                <a className="btn btn--facebook" href="#">
                    <i>
                        <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
                    </i>
                    <span>Đăng ký bằng Google</span>
                </a>
            </div> */}
            <span className="line">Hoặc</span>
            <form action="#" className="form" onSubmit={_handleOnSubmit}>
                <Input
                    ref={firstInputRef}
                    label={"Họ và tên"}
                    placeholder="Họ và tên"
                    isRequire
                    {...register("name")}
                />
                <Input label={"Email"} placeholder="Email" isRequire {...register("email")} />
                <Input
                    type="password"
                    label={"Password"}
                    placeholder="Password"
                    isRequire
                    {...register("password")}
                />
                <Input
                    type="password"
                    label={"Confirm Password"}
                    placeholder="Confirm Password"
                    isRequire
                    {...register("passwordConfirm")}
                />

                <p className="form__argee">
                    Với việc đăng ký, bạn đã đồng ý
                    <Link
                        className="color--primary"
                        to={PATH.PRIVACY}
                        onClick={(e) => {
                            _handleCloseModal();
                        }}
                    >
                        {` Chính Sách Điều Khoản `}
                    </Link>
                    của CFD
                </p>
                <button className="btn btn--primary form__btn-register" type="submit">
                    Đăng ký tài khoản
                </button>
            </form>
        </div>
    );
};

export default AuthRegister;
