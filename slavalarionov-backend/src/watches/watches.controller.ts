import { Controller, Get } from '@nestjs/common';
import { WatchesService } from './watches.service';
import { WatchDto } from './dto/watch.dto';

@Controller('watches')
export class WatchesController {
    constructor(private readonly watchesService: WatchesService) {}

    @Get()
    async findAll(): Promise<WatchDto[]> {
        return this.watchesService.findAll();
    }
}