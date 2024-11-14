import { STORAGE } from "@/constant/storage";
import Cookies from "js-cookie";

// local Storage
const localToken = {
    get() {
        return JSON.parse(
            localStorage.getItem(STORAGE.token) === undefined
                ? null
                : localStorage.getItem(STORAGE.token)
        );
    },
    set(token) {
        return localStorage.setItem(STORAGE.token, JSON.stringify(token));
    },
    remove() {
        return localStorage.removeItem(STORAGE.token);
    },
};

// Cookies
const cookieToken = {
    get() {
        return JSON.parse(
            Cookies.get(STORAGE.token) === undefined ? null : Cookies.get(STORAGE.token)
        );
    },
    set(token) {
        return Cookies.set(STORAGE.token, JSON.stringify(token));
    },
    remove() {
        return Cookies.remove(STORAGE.token);
    },
};

const methodToken = {
    get() {
        // return localToken.get()
        return cookieToken.get();
    },
    set(token) {
        // return localToken(token);
        return cookieToken.set(token);
    },
    remove() {
        // return localToken.remove();
        return cookieToken.remove();
    },
};

export default methodToken;
