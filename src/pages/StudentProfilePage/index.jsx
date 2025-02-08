import { useAuthContext } from "@/context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";

const StudentProfilePage = () => {
    const { profile } = useAuthContext();
    const { firstName, email, profileImage, phone, facebookURL, introduce } = profile || {};

    return (
        <main className="mainwrapper profilepage">
            <div className="container">
                <div className="wrapper">
                    <div className="sidebar">
                        <div className="sidebar__info">
                            <div className="useravatar">
                                <div className="avatar">
                                    <div className="/img">
                                        <img
                                            src={profileImage || "/img/default-avatar.jpg"}
                                            alt="avatar"
                                        />
                                    </div>
                                </div>
                                <h3 className="title --t3">{firstName || ""}</h3>
                            </div>
                        </div>
                        <div className="sidebar__content">
                            <h4>Giới thiệu</h4>
                            <p className="description">{introduce || ""}</p>
                            <ul>
                                <li>
                                    <img src="/img/icon-mail-outline.svg" alt="icon" />
                                    <span>{email || ""}</span>
                                </li>
                                <li>
                                    <img src="/img/icon-phone-outline.svg" alt="icon" />
                                    <span>{phone || ""}</span>
                                </li>
                                <li style={{ wordBreak: "break-all" }}>
                                    <img src="/img/icon-link.svg" alt="icon" />
                                    {facebookURL || (
                                        <a href={facebookURL} target="_blank">
                                            {facebookURL || ""}
                                        </a>
                                    )}
                                </li>
                            </ul>
                            <div className="social">
                                <a href="https://www.facebook.com/" target="_blank">
                                    <img src="/img/icon-fb-footer.svg" alt />
                                </a>
                                <a href="https://www.linkedin.com/" target="_blank">
                                    <img src="/img/icon-linkedin-ft.svg" alt />
                                </a>
                                <a href="https://www.youtube.com/" target="_blank">
                                    <img src="/img/icon-ytb-ft.svg" alt />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tabwrap">
                        <div className="tab">
                            <div className="tab__title">
                                <NavLink to="/student-profile" end>
                                    Thông tin cá nhân
                                </NavLink>
                                <NavLink to="/student-profile/my-courses">Khóa học của tôi</NavLink>
                                <NavLink to="/student-profile/my-method">
                                    Lịch sử thanh toán
                                </NavLink>
                            </div>
                            <div className="tab__content">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StudentProfilePage;
