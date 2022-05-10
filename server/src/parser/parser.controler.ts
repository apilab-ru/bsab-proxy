import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ParserBsaberService } from './services/parser-bsaber.service';
import { ParserBeatSaverService } from './services/parser-beat-saver.service';
import { SettingsService } from "../settings/services/settings-service";

@ApiTags('parser')
@Controller('parser')
export class ParserController {
    constructor(
        private parserBsaberService: ParserBsaberService,
        private parserService: ParserBeatSaverService,
        private settingsService: SettingsService,
    ) {
    }


    @Get('ping')
    ping(): string {
        this.parserBsaberService.parseOld();
        return 'pong';
    }

    @Get('parser-beat')
    parserBeat(): string {
        const page = 2232;
        this.parserPage(page);
        return 'success';
    }

    private parserPage(page: number) {
        const start = new Date().getTime();
        console.log('xxx start', page);
        this.parserService.loadPage(page).subscribe(list => {
            const time = new Date().getTime() - start;
            this.settingsService.updateSettings('parserProcess', {
                time,
                page,
            });
            console.log('xxx process', page, time);
            if (list.length) {
                this.parserPage(page + 1);
            } else {
                console.log('xxx stop');
            }
        });
    }

}
