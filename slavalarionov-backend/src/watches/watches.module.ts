import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WatchesService } from './watches.service';
import { WatchesController } from './watches.controller';
import { CmsAuthModule } from '../cms-auth/cms-auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        ConfigModule,
        CmsAuthModule,
        CacheModule.register(), // добавить сюда
    ],
    controllers: [WatchesController],
    providers: [WatchesService],
})
export class WatchesModule {}