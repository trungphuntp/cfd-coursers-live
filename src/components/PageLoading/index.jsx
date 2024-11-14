import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const StyleLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageLoading = () => {
    return (
        <StyleLoading className="loading">
            <Spin />
        </StyleLoading>
    );
};

export default PageLoading;
