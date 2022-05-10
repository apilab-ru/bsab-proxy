import { FilterItem, FilterItemType } from "../interfaces/filter";

type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

export const FILTER_ITEMS_MAP: Record<string, DistributiveOmit<FilterItem, 'key'>> = {
    search: {
        name: 'Search',
        type: FilterItemType.write,
        filterFunc: () => true,
        unique: true,
        default: true,
    },
    tags: {
        name: 'Tag',
        type: FilterItemType.list,
        values: [{ name: 'Pop', key: '2' }, { name: 'Speed', key: '5' }]
    },
    npsFrom:  {
        name: 'NPS From',
        type: FilterItemType.write,
        filterFunc: () => true,
        unique: true,
    },
    npsTo: {
        name: 'NPS To',
        type: FilterItemType.write,
        filterFunc: () => true,
        unique: true,
    },
};

export const FILTER_ITEMS: FilterItem[] = Object.entries(FILTER_ITEMS_MAP)
    .map(([key, item]) => ({ ...item, key }));
