import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MapOldEntity } from './entites/mapOldEntity';
import { GenreEntity } from './entites/genre.entity';
import { ParserBsaberService } from './services/parser-bsaber.service';
import { ParserController } from './parser.controler';
import { ParserBeatSaverService } from './services/parser-beat-saver.service';
import { TagsService } from "./services/tags-service";
import { AuthorsService } from './services/authors-service';
import { MapsService } from "./services/maps-service";
import { SettingsService } from "../settings/services/settings-service";
import { ErrorsService } from "../settings/services/errors-service";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([MapOldEntity, GenreEntity]),
        ScheduleModule.forRoot(),
    ],
    controllers: [
        ParserController,
    ],
    providers: [
        ParserBsaberService,
        ParserBeatSaverService,
        TagsService,
        AuthorsService,
        MapsService,
        SettingsService,
        ErrorsService,
    ],
})
export class ParserModule {
}
