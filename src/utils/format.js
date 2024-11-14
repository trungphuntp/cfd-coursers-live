import { FORMAT } from "./constant/format";
import moment from "moment";

export const formatDate = (date, format = FORMAT.date) => {
    if (!!!date) {
        return "";
    }
    return moment(date).format(format);
};

export const formatCurrency = (data, type = "vi-VN") => {
    if (isNaN(data) || !data) {
        return 0;
    }
    return data?.toLocaleString(type);
};
