import { Injectable } from "@nestjs/common";
import { catchError, combineLatest, from, mapTo, Observable, of } from "rxjs";
import { Connection, Repository } from "typeorm/index";
import { MapEntity } from "../entites/mapEntity";
import { ErrorsService } from "../../settings/services/errors-service";

@Injectable()
export class MapsService {
    private repository: Repository<MapEntity>;

    constructor(
        connection: Connection,
        private errorsService: ErrorsService,
    ) {
        this.repository = connection.getRepository(MapEntity);
    }

    getByIds(ids: string[]): Observable<MapEntity[]> {
        return from(this.repository.findByIds(ids));
    }

    saveList(list: MapEntity[]): Observable<MapEntity[]> {
        return combineLatest(
            list.map(item => from(this.repository.save(item)).pipe(
                catchError(error => {
                    this.errorsService.addError(error, item);

                    return of(null);
                })
            ))
        ).pipe(
            mapTo(list),
        )
    }
}
