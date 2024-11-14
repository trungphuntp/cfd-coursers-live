import { Flex, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import styled from "styled-components";

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(256, 256, 256, 0.5);

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

const ComponentLoading = () => {
    return (
        <Loading className="loading-component">
            <Spin></Spin>
        </Loading>
    );
};

export default ComponentLoading;