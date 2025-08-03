import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CmsAuthService } from './cms-auth.service';

@Module({
    imports: [ConfigModule, HttpModule],
    providers: [CmsAuthService],
    exports: [CmsAuthService],
})
export class CmsAuthModule {}