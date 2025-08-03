import { Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WatchDto } from './dto/watch.dto';
import { CmsAuthService } from '../cms-auth/cms-auth.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class WatchesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly cmsAuthService: CmsAuthService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async findAll(): Promise<WatchDto[]> {
        const cacheKey = 'watches';
        const cached = await this.cacheManager.get<WatchDto[]>(cacheKey);
        if (cached) return cached;

        const CMS_API_URL = this.configService.get<string>('CMS_API_URL');
        if (!CMS_API_URL) {
            throw new InternalServerErrorException('CMS_API_URL не задан в переменных окружения');
        }
        const result = await this.cmsAuthService.requestWithAuth(async (token) => {
            const { data } = await this.cmsAuthService['httpService'].axiosRef.get(`${CMS_API_URL}/api/${cacheKey}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.docs.map((item) => ({
                id: String(item.id),
                model: item.model,
                image: item.image?.url
                    ? `${CMS_API_URL}/${item.image.url}`
                    : null,
                sizes: Array.isArray(item.sizes)
                    ? item.sizes.map((s: any) => typeof s === 'string' ? s : s.size)
                    : [],
                colors: item.colors?.map((color) => ({
                    colorName: color.colorName,
                    colorHex: color.colorHex,
                })) || [],
            }));
        });

        await this.cacheManager.set(cacheKey, result, 60); // кэш на 60 секунд
        return result;
    }
}