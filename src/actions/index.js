export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching());
	request("http://localhost:3001/heroes")
		.then((data) => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
	dispatch(filtersFetching());
	request("http://localhost:3001/filters")
            .then(data => dispatch(changeFilters(data)))
};

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const changeFilters = (filters) => {
    return {
        type: 'CHANGE_FILTERS',
        payload: filters
    }
}

export const changeActiveFilters = (filters) => {
    return {
        type: 'CHANGE_ACTIVE_FILTERS',
        payload: filters
    }
}