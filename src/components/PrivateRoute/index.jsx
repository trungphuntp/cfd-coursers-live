import { MODAL_TYPE } from "@/constant/general";
import { useAuthContext } from "@/context/AuthContext";
import methodToken from "@/utils/token";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/" }) => {
    const { _handleShowModal } = useAuthContext();

    if (!!!methodToken.get()) {
        _handleShowModal?.(MODAL_TYPE.login);
        return <Navigate to={redirectPath} />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoute;
