import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const devEnv = process.env.NODE_ENV !== 'production';

const HTTPS = axios.create({
    baseURL: `${devEnv ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_API_URL}`,
});

HTTPS.interceptors.request.use(
    (req: AxiosRequestConfig) => {
        const accessToken = localStorage.accessToken;
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    },
    function error() {
        return Promise.reject(error);
    },
);

export default HTTPS;
