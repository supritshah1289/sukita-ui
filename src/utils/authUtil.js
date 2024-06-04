import { ACCESS_TOKEN } from "src/constants";


export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};
