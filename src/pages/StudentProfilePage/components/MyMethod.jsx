import { useAuthContext } from "@/context/AuthContext";
import { formatCurrency, formatDate } from "@/utils/format";
import { Empty } from "antd";
import React from "react";

const MyMethod = () => {
    const { myPayment } = useAuthContext();

    const changePaymentMethod = (payment) => {
        switch (payment) {
            case "atm":
                return "Chuyển khoản";
            case "momo":
                return "Ví momo";
            case "cash":
                return "Tiền mặt";

            default:
                return "";
        }
    };

    return (
        <div className="tab__content-item" style={{ display: "block" }}>
            {myPayment?.length <= 0 ? (
                <Empty description="Không có khoản thanh toán nào" />
            ) : (
                myPayment?.map((item, index) => {
                    // console.log(item);
                    const { course, paymentMethod, updatedAt } = item;
                    return (
                        <div className="itemhistory" key={item?.id || new Date().getTime + index}>
                            <div className="name">{course?.name || ""}</div>
                            <div className="payment">{changePaymentMethod(paymentMethod)}</div>
                            <div className="date">{formatDate(updatedAt) || ""}</div>
                            <div className="money">{formatCurrency(course?.price) || 0} VND</div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
{
}
export default MyMethod;
