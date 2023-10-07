import axios from "axios";
import config, { atlAPIUrl,  agptAPIUrl, userAPIUrl, daysLeftAPIUrl } from "./config";

axios.defaults.baseURL = config.atlAPIUrl;
axios.defaults.baseURL = config.agptAPIUrl;
axios.defaults.baseURL = config.userAPIUrl;
axios.defaults.baseURL = config.daysLeftAPIUrl;

export const getAtl = wholeUrl => {
    
    const requestUrl = atlAPIUrl + wholeUrl;
    return axios.get(requestUrl)
};

export const getAgpt = wholeUrl => {
    
    const requestUrl = agptAPIUrl + wholeUrl;
    return axios.get(requestUrl)
};

export const getUser = wholeUrl => {
    
    const requestUrl = userAPIUrl + wholeUrl;
    return axios.get(requestUrl)
};

export const getDaysLeft = wholeUrl => {
    
    const requestUrl = daysLeftAPIUrl + wholeUrl;
    return axios.get(requestUrl)
};