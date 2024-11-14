import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
    const params = useParams();
    const [isShowNav, setIsShowNav] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [params]);

    const toggleShowNav = () => {
        isShowNav ? $("body").removeClass("menu-show") : $("body").addClass("menu-show");
        setIsShowNav((pre) => !pre);
    };

    return <MainContext.Provider value={{ toggleShowNav, isShowNav }}>{children}</MainContext.Provider>;
};

export const UseMainContext = () => {
    return useContext(MainContext);
};
