import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MapEntity } from './entites/map.entity';
import { GenreEntity } from './entites/genre.entity';
import { ParserBsaberService } from './parser-bsaber.service';
import { ParserController } from './parser.controler';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([MapEntity, GenreEntity]),
        ScheduleModule.forRoot(),
    ],
    controllers: [
        ParserController,
    ],
    providers: [
        ParserBsaberService,
    ],
})
export class ParserModule {
}
