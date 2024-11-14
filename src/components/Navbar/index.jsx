import { UseMainContext } from "@/context/MainContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { toggleShowNav } = UseMainContext();

    const _onNavClick = (e) => {
        e.stopPropagation;
        toggleShowNav?.();
    };
    return (
        <nav className="navbar">
            <ul className="navbar__main" onClick={_onNavClick}>
                <li className="navbar__link">
                    <NavLink to="/" className="navbar__item">
                        Trang chủ
                    </NavLink>
                </li>
                <li className="navbar__link">
                    <NavLink to="/about" className="navbar__item">
                        Về CFD Circle
                    </NavLink>
                </li>
                <li className="navbar__link">
                    <NavLink to="/courses" className="navbar__item">
                        Khóa học
                    </NavLink>
                </li>
                <li className="navbar__link">
                    <NavLink to="/blog" className="navbar__item">
                        Bài viết
                    </NavLink>
                </li>
                <li className="navbar__link">
                    <NavLink to="/contact" className="navbar__item">
                        Liên hệ
                    </NavLink>
                </li>
            </ul>
            <div className="navbar__overlay" />
        </nav>
    );
};

export default Navbar;
