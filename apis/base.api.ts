import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { BASE_URL } from 'config';

import type { CustomAxiosRequestConfig } from './type';

export default class BaseAPI {
  private instance: AxiosInstance;

  private _jwtToken = '';

  constructor(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    path = path.startsWith('/') ? path.slice(1) : path;

    const url = new URL(`api/${path}`, BASE_URL);

    this.instance = axios.create({
      baseURL: url.href,
      validateStatus: (status) => status < 500,
      paramsSerializer: qs.stringify,
      withCredentials: true,
    });

    this.getJwtToken = this.getJwtToken.bind(this);
    this.handleAuthenticationInterceptor = this.handleAuthenticationInterceptor.bind(this);

    this.instance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      if (config.isRequiredLogin) {
        config = this.handleAuthenticationInterceptor(config);
      }

      return config;
    });
  }

  protected async get<T>(url: string, config?: CustomAxiosRequestConfig) {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  protected async post<T, K>(url: string, data?: T, config?: CustomAxiosRequestConfig) {
    const response = await this.instance.post<T, K>(url, data, config);
    return response;
  }

  protected async put<T, K>(url: string, data?: T, config?: CustomAxiosRequestConfig) {
    const response = await this.instance.put<T, K>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, data?: object, config?: CustomAxiosRequestConfig) {
    const response = await this.instance.delete<T>(url, { ...config, ...data });
    return response.data;
  }

  private handleAuthenticationInterceptor(config: AxiosRequestConfig) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer "${this.getJwtToken()}"`,
      },
    };
  }

  private getJwtToken(): string {
    this._jwtToken = this._jwtToken || sessionStorage.getItem('jwtToken') || '';
    return this._jwtToken;
  }
}
