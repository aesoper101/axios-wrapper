import { createApp } from "vue";
import App from "./App.vue";
import AxiosPlugin, { Config, AxiosInterceptorConfig, HttpError } from "../packages";

const config: Config = {
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
      onRejected: (error: HttpError) => console.log(111, error.message),
    },
    {
      onFulfilled: (value) => Promise.resolve(value),
      onRejected: (error) => console.log(222, error),
    },
  ],
};

createApp(App)
  .use(AxiosPlugin, { ...config, ...interceptors })
  .mount("#app");
