import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from "axios";
import { APIResult } from "./types";

interface AxiosInterceptor<V, T = V> {
  onFulfilled?: (value: V) => T | Promise<T>;
  onRejected?: (error: any) => any;
}

export type AxiosRequestInterceptor = AxiosInterceptor<AxiosRequestConfig>;
export type AxiosResponseInterceptor = AxiosInterceptor<AxiosResponse>;

export interface AxiosInterceptorConfig {
  requestInterceptor?: AxiosRequestInterceptor[];
  responseInterceptor?: AxiosResponseInterceptor[];
}

export class AxiosRequest {
  private readonly axiosInstance: AxiosInstance;
  // axios取消对象
  private cancelToken: CancelTokenStatic = Axios.CancelToken;
  private source = this.cancelToken.source();

  constructor(config: AxiosRequestConfig & AxiosInterceptorConfig) {
    const { requestInterceptor, responseInterceptor, ...axiosConfig } = config;
    this.axiosInstance = Axios.create(axiosConfig);

    const injectCancelTokenInterceptor: AxiosInterceptor<AxiosRequestConfig> = {
      onFulfilled: (value) => {
        value.cancelToken = this.source.token;
        return value;
      },
    };

    requestInterceptor?.unshift(injectCancelTokenInterceptor);

    this.setupInterceptors(requestInterceptor, responseInterceptor);
  }

  private setupInterceptors(
    requestInterceptors?: AxiosRequestInterceptor[],
    responseInterceptors?: AxiosResponseInterceptor[]
  ): void {
    requestInterceptors?.forEach((value) => {
      this.axiosInstance.interceptors.request.use(value.onFulfilled, value.onRejected);
    });

    responseInterceptors?.forEach((value) => {
      this.axiosInstance.interceptors.response.use(value.onFulfilled, value.onRejected);
    });
  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.axiosInstance.getUri(config);
  }

  public request<T, B = APIResult<T>>(config: AxiosRequestConfig): Promise<B> {
    return this.axiosInstance.request(config);
  }

  public get<T, B = APIResult<T>>(url: string, config?: AxiosRequestConfig): Promise<B> {
    return this.axiosInstance.get(url, config);
  }

  public delete<T, B = APIResult<T>>(url: string, config?: AxiosRequestConfig): Promise<B> {
    return this.axiosInstance.delete(url, config);
  }

  public head<T, B = APIResult<T>>(url: string, config?: AxiosRequestConfig): Promise<B> {
    return this.axiosInstance.head(url, config);
  }

  public post<T, D, B = APIResult<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<B> {
    return this.axiosInstance.post(url, data, config);
  }

  public put<T, D, B = APIResult<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<B> {
    return this.axiosInstance.put(url, data, config);
  }

  public patch<T, D, B = APIResult<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<B> {
    return this.axiosInstance.patch(url, data, config);
  }

  public cancel(message?: string): void {
    this.source.cancel(message);
  }
}
