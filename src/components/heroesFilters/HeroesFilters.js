import { useDispatch, useSelector } from 'react-redux';
import { filtersFetching, changeFilters, changeActiveFilters } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from "react";
import Spinner from '../spinner/Spinner';



// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом






const activeFilters = []

const HeroesFilters = () => {
    const { filters, filterLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch()
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(changeFilters(data)))

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
            console.log(classesForButtons.filter)
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
        
        console.log(activeFilters)
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