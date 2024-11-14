import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";
import PageLoading from "@/components/PageLoading";
import { AuthContextProvider } from "@/context/AuthContext";
import { MainContextProvider } from "@/context/MainContext";

import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <MainContextProvider>
                <AuthContextProvider>
                    {/* <PageLoading /> */}
                    <Header />
                    <Navbar />
                    <Overlay />
                    {/* main UI */}
                    <Outlet />
                    <Footer />
                    {/* Modal Đăng Nhập / Đăng Ký */}
                    <AuthModal />;
                </AuthContextProvider>
            </MainContextProvider>
        </>
    );
};

export default MainLayout;
