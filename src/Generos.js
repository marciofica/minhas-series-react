import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteGenero = id => {
        axios
            .delete('/api/genres/' + id)
            .then(res =>{
                const filtro = data.filter(item => item.id !== id)
                setData(filtro)
            })
    }

    const renderizalinha = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td style={{width: '15%'}}>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
                    <Link to={`/generos/${record.id}`} className='ml-1 btn btn-sm btn-warning'>Editar</Link>
                </td>
            </tr> 
        )
    }

    if(data.length === 0) {
        return(
            <div className='container'>
                <h1>Gêneros</h1>
                <Link className='mb-1 btn btn-sm btn-primary' to='/generos/novo'>Adicionar</Link>
                <div className='alert alert-warning' role='alert'>
                    Você não possui gêneros criados.
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <Link className='mb-1 btn btn-sm btn-primary' to='/generos/novo'>Adicionar</Link>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(renderizalinha)
                    }
                </tbody>
            </table>
        </div>
        
    )
}

export default Generos