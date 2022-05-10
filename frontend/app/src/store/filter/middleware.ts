import { load } from '../list/store';

interface QueryParams  {
    filter?: string;
    page?: string;
}

// @ts-ignore
export const filterQueryUpdater = store => next => action => {
    const result = next(action);
    if (action.type.includes('filter/')) {
        const { values, page } = store.getState().filter;
        const params: QueryParams = {};
        if (values.length) {
            params.filter = JSON.stringify(values)
        }
        if (page && page !== 1) {
            params.page = page;
        }
        const stringValues = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        window.history.pushState(
            { page: "main" },
            '',
            "/?" + stringValues
        );

        store.dispatch(load({ values, page }))
    }
    return result
}
