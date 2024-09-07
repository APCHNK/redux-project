import { useDispatch, useSelector } from 'react-redux';
import { fetchFilters } from './filtersSlice';
import { changeActiveFilters } from './filtersSlice';
import { useEffect } from "react";
import Spinner from '../spinner/Spinner';

const activeFilters = []

const HeroesFilters = () => {
    const { filters, filterLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, [])

    const classesForButtons = {
        all: 'btn-outline-dark',
        fire: 'btn-danger',
        water: 'btn-primary',
        wind: 'btn-success',
        earth: 'btn-secondary'
    }

    const renderFilterList = () => {
        
        return filters.map((filter, i) => {
            if (filter === 'all') {
                return <button onClick={onClick} key={i} className="btn btn-danger active">{filter}</button>
            }
            return <button onClick={onClick} key={i} className={'btn ' + classesForButtons[filter]}>{filter}</button>
        })
    }

    const onClick = (e) => {
        let target = e.target
        target.classList.toggle('active')
        
        if (target.classList.contains('active')) {
            activeFilters.push(target.textContent)
        } else {
             if (activeFilters.includes(target.textContent)) {
                for (let i = 0; i < activeFilters.length; i++) {
                    if(activeFilters[i] === target.textContent){
                        activeFilters.splice(i, 1)
                    }
                }
            }
        }
        
        // console.log(activeFilters)
        dispatch(changeActiveFilters(activeFilters))
    }

    let filter = null

    if (filterLoadingStatus === "loading") {
        filter = <Spinner/>;
    } else {
        filter = renderFilterList(filters)
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filter}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;