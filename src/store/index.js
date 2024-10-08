import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

// const store = createStore( 
//                 combineReducers({heroes, filters}),
//                 compose(applyMiddleware(thunk, stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                 );

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddlewere => getDefaultMiddlewere().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;