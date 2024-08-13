import request, { AxiosRequestConfig, AxiosResponse } from './Request';

interface RequestParams {
  [key: string]: any;
}

interface RequestData {
  [key: string]: any;
}

class HttpRequest {
  static get<T>(url: string, params: RequestParams = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return request({
      url,
      method: 'GET',
      params,
      ...config
    });
  }

  static post<T>(url: string, data: RequestData, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return request({
      url,
      method: 'POST',
      data,
      ...config
    });
  }

  static patch<T>(url: string, data: RequestData, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return request({
      url,
      method: 'PATCH',
      data,
      ...config
    });
  }

  static put<T>(url: string, data: RequestData, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return request({
      url,
      method: 'PUT',
      data,
      ...config
    });
  }

  static delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return request({
      url,
      method: 'DELETE',
      ...config
    });
  }
}

export default HttpRequest;
