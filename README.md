# Axios-wrapper

wrapper for Axios.

# Using

```typescript
import { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosRequest, AxiosInterceptorConfig } from "@aesoper/axios-wrapper";

const config: AxiosRequestConfig = {
  // baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  // 3000ms
  timeout: 3000,
};

const interceptors: AxiosInterceptorConfig = {
  requestInterceptor: [
    {
      onFulfilled: (value) => {
        console.log("----------");
        return value;
      },
      onRejected: (error) => console.log(error),
    },
    {
      onFulfilled: (value) => {
        console.log("=========");
        value.params = { id: 2 };
        return Promise.resolve(value);
      },
      onRejected: (error) => console.log(error),
    },
  ],
  responseInterceptor: [
    {
      onFulfilled: (value) => Promise.resolve(value),
      onRejected: (error: AxiosError) => console.log(111, error.message),
    },
    {
      onFulfilled: (value) => Promise.resolve(value),
      onRejected: (error) => console.log(222, error),
    },
  ],
};

const http = new AxiosRequest({ ...config, ...interceptors });

http.get("http://xxxx.com/");
```
