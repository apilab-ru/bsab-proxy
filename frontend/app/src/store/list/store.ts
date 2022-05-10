import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../filter/store";

const initialState = {
    items: [] as any[],
    isLoading: false,
};

export type ListState = typeof initialState;

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        load: (state, { payload }: { payload: FilterState }) => {
            state.isLoading = true;
        },
        set: (state, { payload }: { payload: FilterState }) => {
            console.log('xxx after loading', payload);
            state.isLoading = false;
        }
    }
});

export const { load, set } = listSlice.actions;
export const listReducer = listSlice.reducer;
