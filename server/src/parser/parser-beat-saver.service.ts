import { HttpService, Injectable } from "@nestjs/common";
import { switchMap } from "rxjs";



@Injectable()
export class ParserBeatSaverService {
    private fileDir = 'F:/beat-saber-files/';
    private api = 'https://beatsaver.com/api/';

    constructor(
        private httpService: HttpService,
    ) {
    }

    loadPage(page = 0) {
        return this.httpService.get(this.api + `search/text/${page}?sortOrder=Relevance`).pipe(
            switchMap(res => {

            })
        )
    }

}
