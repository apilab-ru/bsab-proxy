import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { filterReducer, FilterState } from "./filter/store";
import { filterQueryUpdater } from "./filter/middleware";
import { createEpicMiddleware } from 'redux-observable';
import { listEpic } from "./list/epics";
import { listReducer, ListState } from "./list/store";

const epicMiddleware = createEpicMiddleware();

export interface RootState {
    filter: FilterState
    list: ListState;
}

declare module 'react-redux' {
    interface DefaultRootState extends RootState {
    }
}

export const AppStore = createStore(
    combineReducers({
        filter: filterReducer,
        list: listReducer,
    }),
    applyMiddleware(filterQueryUpdater, epicMiddleware)
)

// @ts-ignore
epicMiddleware.run(listEpic);
