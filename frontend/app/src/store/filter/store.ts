import { createSlice } from '@reduxjs/toolkit'
import { SearchValue } from "../../interfaces/filter";

// https://redux-toolkit.js.org/usage/usage-guide

const initialState = {
    values: [] as SearchValue[],
    page: 1,
};

export type FilterState = typeof initialState;

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        add: (state, { payload }) => {
            state.values.push(payload);
        },
        remove: (state, { payload }) => {
            state.values.splice(payload, 1);
        },
        set: (state, { payload }) => {
            state.values = payload;
        }
    },
})

export const { add, remove, set } = filterSlice.actions
export const filterReducer = filterSlice.reducer;
