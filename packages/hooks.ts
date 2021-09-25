import { Config, HttpRequest } from "./axios-wrapper";

let http: HttpRequest = new HttpRequest({
  withCredentials: true,
  timeout: 3000,
});

export function setUpHttp(cfg?: Config): void {
  if (cfg) {
    http = new HttpRequest(cfg);
  }
}

export function useClient(): HttpRequest {
  return http;
}
