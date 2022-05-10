import { debounceTime, filter, map, Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { load, set } from './store';
import { RootState } from "../store";

// @ts-ignore
export function listEpic(action$: Observable<{ type: string }>, store$: Observable<RootState>) {
    return action$.pipe(
        filter(({ type }) => type === 'list/load'),
        debounceTime(100),
        withLatestFrom(store$),
        map(([_, { filter }]) => filter),
        switchMap(value => of(value)),
        map(response => set(response)),
    )
}
