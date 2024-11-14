import React from "react";

const PageNotFound = () => {
    return (
        <main class="mainwrapper notfoundpage">
            <section>
                <div class="container">
                    <h2 class="title --t1">404</h2>
                    <p>Không tìm thấy trang</p>
                    <a href="./" class="btn btn--primary">
                        Trang chủ
                    </a>
                </div>
            </section>
        </main>
    );
};

export default PageNotFound;
