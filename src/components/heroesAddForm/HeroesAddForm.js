import { v4 as uuidv4 } from 'uuid'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';
import { fetchHeroes } from '../heroesList/heroesSlice';
import { useDispatch } from 'react-redux';

const HeroesAddForm = () => {
    const {request} = useHttp()
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: ''
            }}
            validationSchema={Yup.object({
                name: Yup.string().min(2, 'Must be 2 characters or more').required('Required'),
                text: Yup.string().min(10, 'Must be 10 characters or more').required('Required'),
                element: Yup.string().required('Required')
            })}
            onSubmit={values => {
                const body = {
                    id: uuidv4(),
                    ...values
                }
                request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(body))
                    .then(() => dispatch(fetchHeroes(request)))
            }}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name="name" className='error' component={'div'} />

                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as="textarea"
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage name="text" className='error' component={'div'} />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        as='select'
                        className="form-select" 
                        id="element"  
                        name="element">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                    <ErrorMessage name="element" className='error' component={'div'} />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;