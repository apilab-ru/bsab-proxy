import { Injectable } from "@nestjs/common";
import { filter, from, map, mapTo, Observable, of, shareReplay, startWith, Subject, switchMap, take, tap } from "rxjs";
import { Connection, Repository } from "typeorm/index";
import { SettingsEntity } from "../entites/settings.entity";

@Injectable()
export class SettingsService {
    private repository: Repository<SettingsEntity>;

    constructor(
        connection: Connection,
    ) {
        this.repository = connection.getRepository(SettingsEntity);
    }

    updateSettings(id: string, data: any): void {
        this.repository.save({
            id, data
        });
    }
}
