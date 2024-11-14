import React from "react";
import HeaderHumburger from "./components/HeaderHumburger";
import HeaderLogo from "./components/HeaderLogo";
import HeaderLog from "./components/HeaderLog";

const Header = () => {
    return (
        <header className="header --transparent">
            <div className="container-fluid">
                <HeaderHumburger />
                <HeaderLogo />
                <HeaderLog />
            </div>
        </header>
    );
};

export default Header;
