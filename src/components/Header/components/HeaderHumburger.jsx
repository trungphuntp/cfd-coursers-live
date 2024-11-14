import { UseMainContext } from "@/context/MainContext";

const HeaderHumburger = () => {
    const { toggleShowNav, isShowNav } = UseMainContext();

    const _OnHumburgerClick = (e) => {
        e.stopPropagation();
        toggleShowNav?.();
    };

    return (
        <div className={`header__humburger  ${isShowNav ? "--close" : ""}`} onClick={_OnHumburgerClick}>
            <div className="header__humburger-button">
                <span />
                <span />
                <span />
            </div>
            <div className="header__humburger-text">
                <span>Menu</span>
                <span>Đóng</span>
            </div>
        </div>
    );
};

export default HeaderHumburger;
