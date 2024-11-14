import React from "react";

const ChangePasswordPage = () => {
    return (
        <main class="mainwrapper changepassword">
            <div class="container">
                <div class="form">
                    <h3 class="title --t3">Khôi phục mật khẩu</h3>
                    <div class="form-group">
                        <label class="label">
                            Mật khẩu mới <span>*</span>
                        </label>
                        <input value="" type="password" class="form__input" />
                    </div>
                    <div class="form-group">
                        <label class="label">
                            Xác nhận mật khẩu <span>*</span>
                        </label>
                        <input value="" type="password" class="form__input formerror" />
                        <p class="error">Dòng thông báo lỗi</p>
                    </div>
                    <div class="btncontrol">
                        <a href="#" class="btn btn--primary">
                            Cập nhật
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChangePasswordPage;
