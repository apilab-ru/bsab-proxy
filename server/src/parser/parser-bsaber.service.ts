import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HTMLElement, parse } from 'node-html-parser';
import * as fs from 'fs';
const path = require('path');

const link = (page: number) => `https://bsaber.com/songs/top/page/${page}/?time=all&difficulty=all#038;difficulty=all`;
const install = 'beatsaver://2144';
const preview = 'https://skystudioapps.com/bs-viewer/?id=2144';

@Injectable()
export class ParserBsaberService {
    constructor(
        private httpService: HttpService,
    ) {
    }

    parseOld() {
        this.loadPageOld(1).subscribe(pageHtml => {
            const document = parse(pageHtml);
            const hasNextPage = !!document.querySelector('.pagination').querySelector('.next');
            const arts = document.querySelectorAll('article');
            const list = [];
            arts.forEach(item => {
                list.push(this.parserArt(item));
            });
        });
    }

    private loadPageOld(page: number): Observable<string> {
        /*return this.httpService.get(link(page)).pipe(
            map(res => res.data),
        );*/
        return new Observable<string>(subject => {
            const pathLink = path.resolve(__dirname, './cache.html');
            fs.readFile(pathLink, null, (err, data) => {
                if (err) {
                    subject.error(err);
                } else {
                    subject.next(data.toString());
                }
            });
        });
    }

    private parserArt(item: HTMLElement) {
        const link = item.querySelector('a').attrs['href'];
        const hash = link.split('/').filter(it => it).pop();

        return {
            hash,
            name: this.prepareName(item.querySelector('.entry-title').innerText),
            author: item.querySelector('.mapper_id').querySelector('a')?.attrs['href'].split('/').filter(it => it).pop(),
            date: item.querySelector('.date').attrs['datetime'],
            difficulties: [].map.bind(item.querySelectorAll('.post-difficulty'))(it => it.innerText.toLowerCase()),
            genres: [],
            image: item.querySelector('img').attrs['data-original'],
            description: '',
            ratingUp: 0,
            ratingDown: 0,
            song: '',
        };
    }

    private prepareName(name: string): string {
        return name.trim()
            .replace('&#8211;', '–')
            .replace('&amp;', '&')
            .replace('&#8217;', '’');
    }
}
