import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }

)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroes = action.payload
                state.heroesLoadingStatus = 'idle'
            })
            .addCase(fetchHeroes.rejected, ({heroesLoadingStatus}) => {
                heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice

export default reducer
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError
} = actions