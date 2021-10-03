import { AxiosRequestInterceptor } from "../axios-wrapper";

type TokenGetter = string | (() => string);

export function BearerTokenInterceptor(getter: TokenGetter): AxiosRequestInterceptor {
  return {
    onFulfilled: (config) => {
      const token = typeof getter === "string" ? getter : getter();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return Promise.resolve(config);
    },
  };
}
