<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

  import { HttpRequest, Config, AxiosInterceptorConfig, HttpError } from "@aesoper/axios-wrapper";

  const config: Config = {
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
        onRejected: (error: HttpError) => console.log(111, error.message),
      },
      {
        onFulfilled: (value) => Promise.resolve(value),
        onRejected: (error) => console.log(222, error),
      },
    ],
  };

  const http = new HttpRequest({ ...config, ...interceptors });

  http.get("http://xxxx.com/");
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
