import axios, { AxiosInstance } from 'axios';
import { MMKV } from 'react-native-mmkv';

const BASE_API_URL = 'https://mobile.api.blp.flexy.pw/api';
// const BASE_API_URL = 'http://localhost:3333/api';

export abstract class BaseMobileApi {
  protected readonly client: AxiosInstance;

  public constructor() {
    this.client = axios.create({
      baseURL: BASE_API_URL,
    });

    this.client.interceptors.request.use((config) => {
      const accessToken = MMKV.getString('accessToken');

      if (accessToken) {
        config.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    this.client.interceptors.response.use((value) => value.data);
  }
}

export function createDefaultAxiosClient() {
  const client = axios.create({
    baseURL: BASE_API_URL,
  });

  client.interceptors.request.use((config) => {
    const accessToken = MMKV.getString('accessToken');

    if (accessToken) {
      config.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  client.interceptors.response.use((value) => value.data);

  return client;
}
