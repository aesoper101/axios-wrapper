import { App } from "vue";
import { setUpHttp } from "./hooks";
import { Config } from "./axios-wrapper";

export * from "./types";
export * from "./axios-wrapper";
export * from "./interceptors";
export * from "./hooks";

const AxiosPlugin = {
  install: (app: App, options: Config) => {
    setUpHttp(options);
  },
};

export default AxiosPlugin;
