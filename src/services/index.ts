import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: AxiosError): never {
    throw new Error(error.response?.data as string);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  public async post<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  public async put<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
}

export default ApiService;
