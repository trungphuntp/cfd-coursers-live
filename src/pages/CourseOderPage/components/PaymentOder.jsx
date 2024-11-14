import React, { forwardRef, useImperativeHandle, useState } from "react";

const PAYMENTS = [
    {
        id: "atm",
        label: "Thành toán bằng chuyển khoản",
        icon: "/img/icon-payment-method-atm.svg",
        description:
            "Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản ngân hàng sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của bạn sau khi giao dịch thành công.",
    },
    {
        id: "momo",
        label: "Thanh toán bằng ví Momo",
        icon: "/img/icon-payment-method-mo-mo.svg",
        description:
            " Sau khi bấm đăng ký, mã khoá học &amp; thông tin tài khoản MoMo sẽ được gửi đến email của bạn, bạn vui lòng chuyển khoản với nội dung: mã khoá học, họ và tên, số điện thoại, CFD Circle sẽ liên hệ bạn để xác nhận và kích hoạt khoá học của bạn sau khi giao dịch thành công.",
    },
    {
        id: "cash",
        label: "Thanh toán bằng tiền mặt",
        icon: "/img/icon-payment-method-cod.svg",
        description:
            "  Sau khi bấm đăng ký, thông tin khoá học sẽ được gửi đến email của bạn, bạn vui lòng đến văn phòng CFD Circle vào ngày khai giảng để đóng học phí tại số 11b, Phan Kế Bính, quận 1, TP Hồ Chí Minh.",
    },
];

const PaymentOder = ({ disabled }, ref) => {
    const [selectPaymentMedthod, setSelectPaymentMedthod] = useState("");

    const _onChange = (e) => {
        setSelectPaymentMedthod?.(e?.target.value);
    };

    // useImperativeHandle ref payment
    useImperativeHandle(
        ref,
        () => {
            return {
                selectPaymentMedthod: selectPaymentMedthod,
                setSelectPaymentMedthod,
            };
        },
        [selectPaymentMedthod]
    );

    return (
        <div className="itemorder paymentorder">
            <h3 className="title --t3">Hình thức thanh toán</h3>
            <div className="boxorder">
                {PAYMENTS.map((payment) => {
                    const { id, icon, label, description } = payment;
                    return (
                        <div className="boxorder__pay" key={id}>
                            <label className="radiocontainer">
                                <img src={icon} alt />
                                {label}
                                <input
                                    ref={ref}
                                    disabled={disabled}
                                    type="radio"
                                    name="radio"
                                    value={id}
                                    onChange={_onChange}
                                    checked={id === selectPaymentMedthod}
                                />
                                <span className="checkmark" />
                            </label>
                            <div
                                className="boxorder__pay-tooltip"
                                style={{ display: selectPaymentMedthod === id ? "block" : "none" }}
                            >
                                {description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default forwardRef(PaymentOder);
