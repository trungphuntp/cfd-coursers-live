import React from "react";
import HeaderHumburger from "./Components/HeaderHumburger";
import HeaderLogo from "./Components/HeaderLogo";
import HeaderLog from "./Components/HeaderLog";

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
