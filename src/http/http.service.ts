import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as process from 'process';

@Injectable()
export class HttpService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      },
    });
    this.axios.interceptors.response.use(
      function (response) {
        return response.data;
      },
      function (error) {
        if (error.response) {
          throw new HttpException(
            error.response.data.status.message,
            error.response.data.status.status_code,
          );
        } else if (error.request) {
          throw new BadRequestException(error.message);
        } else {
          return Promise.reject(error);
        }
      },
    );
  }

  getAxios(region: string): AxiosInstance {
    this.axios.defaults.baseURL = `https://${region.toLowerCase()}.api.riotgames.com`;

    return this.axios;
  }
}
