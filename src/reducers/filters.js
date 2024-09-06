const initialState = {
    filters: [],
    filtersLoadingStatus: 'loaded',
    activeFilters: ['all']
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filterLoadingStatus: 'loading'
            }
        case 'CHANGE_FILTERS':
            return {
                ...state,
                filters: action.payload,
                filterLoadingStatus: 'loaded'
            }
        case 'CHANGE_ACTIVE_FILTERS':
            return {
                ...state,
                activeFilters: action.payload
            }
        default: return state
    }
}

export default filters;