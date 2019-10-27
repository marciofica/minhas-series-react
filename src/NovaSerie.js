import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const NovaSerie = () => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    }, [])


    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    
    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios
            .post('/api/series', form).then(res => {
            setSuccess(true)
        })
    }
    
    if(success) {
        return <Redirect to='/series' />
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={form.name} onChange={onChange('name')} className="form-control" id='name' />
                </div>
                <div className='form-group'>
                    <label htmlFor='genre'>Gênero</label>
                    <select className='form-control' id='genre_id' onChange={onChange('genre_id')} value={form.genre_id}>
                        { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
                    </select>
                </div>
                
                <div className='form-check'>
                    <input className='form-check-input' type='radio' name='status' id='assistido' checked={form.status === 'ASSISTIDO'} value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
                    <label className='form-check-label' htmlFor='assistido'>
                        Assitido
                    </label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' name='satus' id='paraAssistir' checked={form.status === 'PARA_ASSISTIR'} value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
                    <label className='form-check-label' htmlFor='exampleRadios2'>
                        Para Assistir
                    </label>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NovaSerie