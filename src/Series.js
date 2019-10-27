import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Badge} from 'reactstrap'

const Series = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteData = id => {
        axios
            .delete('/api/series/' + id)
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
                <td>{record.genre}</td>
                <td>
                    { record.status === 'ASSISTIDO' && <Badge color='success'>Assitido</Badge> }
                    { record.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge> }
                </td>
                <td style={{width: '15%'}}>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteData(record.id)}>Remover</button>
                    <Link to={`/series/${record.id}`} className='ml-1 btn btn-sm btn-warning'>Info</Link>
                </td>
            </tr> 
        )
    }

    if(data.length === 0) {
        return(
            <div className='container'>
                <h1>Séries</h1>
                <Link className='mb-1 btn btn-sm btn-primary' to='/series/novo'>Adicionar</Link>
                <div className='alert alert-warning' role='alert'>
                    Você não possui séries criadas.
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link className='mb-1 btn btn-sm btn-primary' to='/series/novo'>Adicionar</Link>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Gênero</th>
                        <th scope='col'>Status</th>
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

export default Series