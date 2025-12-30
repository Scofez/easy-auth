import axios, { type AxiosInstance, type AxiosRequestConfig, type Method, isAxiosError } from 'axios';

export interface EasyAuthOptions {
    baseURL: string;
    tokenKey: string;
}

export class QueryHandler {
    private readonly axiosInstance: AxiosInstance;

    constructor(options: EasyAuthOptions, getToken: () => string | undefined) {
        this.axiosInstance = axios.create({
            baseURL: options.baseURL,
            headers: { 'Content-Type': 'application/json' }
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
    /**
     * Send a request to the server
     * @param {string} route The route to send the request to
     * @param {Method} method The HTTP method to use
     * @param {unknown} [payload=null] The payload to send
     * @param {AxiosRequestConfig} config Additional configuration
     * 
     * @returns {Promise<T>} The response data
     */
    public async query<T>(route: string, method: Method, payload: unknown = null, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>({
                url: route,
                method,
                data: payload,
                ...config
            });
            return response.data;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                throw error.response?.data || error;
            }
            throw error;
        }
    }
}