import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

const EditarSerie = ({match}) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios
            .get(`/api/series/${match.params.id}`)
            .then(res =>{
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const encontrado = genres.find(value => data.genre === value.name)
                if(encontrado) {
                    setGenreId(encontrado.id)
                }
            })
    }, [data])

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios
            .put('/api/series/'+ match.params.id, {
                ...form,
                genre_id: genreId
            }).then(res => {
            setSuccess(true)
        })
    }
    
    if(success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className='container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' alt={data.name} src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    { data.status === 'ASSISTIDO' && <Badge color='success'>{data.status}</Badge> }
                                    { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>{data.status}</Badge> }
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-sm btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            { mode === 'EDIT' &&    
                <div className='container'>
                    <h1>Editar Série</h1>
                    <button className='btn btn-sm btn-danger' onClick={() => setMode('INFO')}>Cancelar</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentário</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genre'>Gênero</label>
                            <select className='form-control' id='genre_id' onChange={onChangeGenre} value={genreId}>
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
            }
        </div>
    )
}

export default EditarSerie