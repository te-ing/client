import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { BASE_URL } from 'config';

import type { CustomAxiosRequestConfig } from './type';

export default class BaseAPI {
    private instance: AxiosInstance;

    constructor(path: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        path = path.startsWith('/') ? path.slice(1) : path;

        this.instance = axios.create({
            baseURL: `${BASE_URL}`,
            validateStatus: (status) => status < 500,
            paramsSerializer: qs.stringify,
            withCredentials: true
        })
    
        this.instance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
            if(config.isRequiredLogin) console.log('로그인 필수 기능');

            return config;
        })
    }

    protected async get(
        url: string,
        config?: CustomAxiosRequestConfig
    ) {
        const response = await this.instance.get(url, config);
        return response;
    }

    protected async post(
        url: string,
        data?: unknown,
        config?: CustomAxiosRequestConfig
    ) {
        const response = await this.instance.post(url, data, config);
        return response;
    }

    protected async put(
        url: string,
        data?: unknown,
        config?: CustomAxiosRequestConfig
    ) {
        const response = await this.instance.put(url, data, config);
        return response;
    }

    protected async delete(
        url: string,
        data?: object,
        config?: CustomAxiosRequestConfig
    ) {
        const response = await this.instance.delete(url, { ...config, ...data });
        return response;
    }
}