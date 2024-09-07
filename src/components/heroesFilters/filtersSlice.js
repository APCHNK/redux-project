import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: '',
    activeFilters: ['all']
}

export const fetchFilters = createAsyncThunk(
    'filter/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
);

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeActiveFilters: (state, action) => {
            state.activeFilters = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending,  state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                // eslint-disable-next-line
                    state.filtersLoadingStatus = 'loaded',
                    state.filters = action.payload
                })
            .addDefaultCase(() => {})
    }

})

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    changeFilters,
    changeActiveFilters
} = actions