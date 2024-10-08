import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {activeFilters} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr, filterBy) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }


        return arr.map(({id, element, ...props}) => {
            if (filterBy.includes('all')) {
                return <HeroesListItem {...props} key={id} element={element} id={id} />
            } else if (filterBy.includes(element)){
                return <HeroesListItem {...props} element={element} key={id} id={id} />
            }
            else {
                return null
            }
        })
    }

    const elements = renderHeroesList(heroes, activeFilters);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;