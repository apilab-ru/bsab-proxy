import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { ParserBsaberService } from './parser-bsaber.service';

@ApiTags('parser')
@Controller('parser')
export class ParserController {
    constructor(private parserService: ParserBsaberService) {
    }


    @Get('ping')
    ping(): string {
        this.parserService.parseOld();
        return 'pong';
    }

    @Get('parser-beat')
    parserBeat(): string {
        this.parserService.parseOld();
        return 'pong';
    }

}
