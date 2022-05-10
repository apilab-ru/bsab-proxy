import { ReplaySubject, Subject } from 'rxjs'
import { FilterState } from "../store/filter/store";

class MapsService {
    private filter$ = new ReplaySubject<FilterState>(1);

    setFilter(filter: FilterState): void {
        this.filter$.next(filter);
    }
}

export const mapsService = new MapsService();
