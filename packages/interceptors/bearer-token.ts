import { AxiosRequestInterceptor } from "../axios-wrapper";

type TokenGetter = string | (() => string);

export function BearerTokenInterceptor(getter: TokenGetter): AxiosRequestInterceptor {
  const token = typeof getter === "string" ? getter : getter();

  return {
    onFulfilled: (config) => {
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
  };
}
