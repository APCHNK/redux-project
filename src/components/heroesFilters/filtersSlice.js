import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'loaded',
    activeFilters: ['all']
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        changeFilters: (state, action) => {
        // eslint-disable-next-line
            state.filtersLoadingStatus = 'loaded',
            state.filters = [...action.payload]
        },
        changeActiveFilters: (state, action) => {
            state.activeFilters = [...action.payload]
        }
    }

})

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    changeFilters,
    changeActiveFilters
} = actions