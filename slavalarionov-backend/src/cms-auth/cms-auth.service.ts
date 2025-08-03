import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CmsAuthService {
    private cmsToken = '';
    private tokenPromise: Promise<string> | null = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    private async fetchCmsToken(): Promise<string> {
        const CMS_API_URL = this.configService.get<string>('CMS_API_URL');
        const email = this.configService.get<string>('CMS_EMAIL');
        const password = this.configService.get<string>('CMS_PASSWORD');
        if (!CMS_API_URL || !email || !password) {
            throw new InternalServerErrorException('Не заданы переменные окружения для CMS');
        }
        try {
            const { data } = await this.httpService.axiosRef.post(
                `${CMS_API_URL}/api/users/login`,
                { email, password }
            );
            this.cmsToken = data.token;
            return this.cmsToken;
        } catch (error) {
            console.error('Ошибка авторизации в CMS:', error);
            throw new InternalServerErrorException('Ошибка авторизации в CMS');
        }
    }

    async getCmsToken(force = false): Promise<string> {
        if (this.cmsToken && !force) return this.cmsToken;
        if (!this.tokenPromise) {
            this.tokenPromise = this.fetchCmsToken();
            try {
                await this.tokenPromise;
            } finally {
                this.tokenPromise = null;
            }
        }
        return this.cmsToken;
    }

    async requestWithAuth<T>(cb: (token: string) => Promise<T>): Promise<T> {
        let token = await this.getCmsToken();
        try {
            return await cb(token);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                this.cmsToken = '';
                token = await this.getCmsToken(true);
                return await cb(token);
            }
            throw error;
        }
    }
}