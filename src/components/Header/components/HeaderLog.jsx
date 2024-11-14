import { MODAL_TYPE } from "@/constant/general";
import PATH from "@/constant/pathjs";
import { useAuthContext } from "@/context/AuthContext";
import methodToken from "@/utils/token";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderLog = () => {
    const { _handleShowModal, handleLogout, profile } = useAuthContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const { profileImage, firstName } = profile;

    useEffect(() => {
        document.addEventListener("click", _clsoeDropdown);

        return () => {
            document.removeEventListener("click", _clsoeDropdown);
        };
    }, []);

    const _onLoginClick = (e) => {
        e?.stopPropagation();
        _handleShowModal?.(MODAL_TYPE.register);
    };
    const _onRegisterClick = (e) => {
        e?.stopPropagation();
        _handleShowModal?.(MODAL_TYPE.login);
    };

    const _onLogoutClick = (e) => {
        e.preventDefault();
        handleLogout?.();
    };

    const _showDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(true);
    };

    const _clsoeDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(false);
    };

    if (!!methodToken.get()) {
        return (
            <div className="header__logged">
                <div className="userlogged">
                    <div
                        className="userlogged__avatar user"
                        data-dropdown="userlogged__dropdown"
                        onClick={_showDropdown}
                    >
                        <div className="userlogged__avatar-img user__img">
                            <img src={profileImage || "/img/avatar_nghia.jpg"} alt="Avatar teacher" />
                        </div>
                        <i className="userlogged__avatar-icon">
                            <svg
                                width={14}
                                height={14}
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
                            </svg>
                        </i>
                    </div>
                    <div className={`userlogged__dropdown dropdown ${showDropdown ? "active" : ""}`}>
                        <div className="userlogged__dropdown-info">
                            <div className="user__img">
                                <img src={profileImage || "/img/avatar_nghia.jpg"} alt="Avatar teacher" />
                            </div>
                            <Link to={PATH.PROFILE.PATH} className="user__info">
                                <p className="title --t4">
                                    <strong>{firstName}</strong>
                                </p>
                                <span className="email">Thông tin tài khoản</span>
                            </Link>
                        </div>
                        <div className="userlogged__dropdown-list">
                            <Link to={PATH.PROFILE.COURSE}>Khóa học của tôi</Link>
                            <Link to={PATH.PROFILE.PAYMENT}>Lịch sử thanh toán</Link>
                            <Link to={PATH.CONTACT}>Hỗ trợ</Link>
                            <a href="#" onClick={_onLogoutClick}>
                                Đăng xuất{" "}
                                <i>
                                    <img src="img/iconlogout.svg" alt />
                                </i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div class="header__auth">
                    <a href="javascript:void(0)" class="btn btn--transparent btnmodal" data-modal="mdlogin">
                        <span onClick={_onLoginClick}>Đăng ký /&nbsp;</span>
                        <span onClick={_onRegisterClick}>Đăng nhập</span>
                    </a>
                </div>
            </>
        );
    }
};

export default HeaderLog;
