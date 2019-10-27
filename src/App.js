import React from 'react'
import Header from './Header'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

const Home = () => {
  return (
    <div className='container text-center'>
      <h3 className='mt-3'>Escolha uma das opções acima</h3> 
    </div>
  )
}


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NovaSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
        
      </div>
    </Router>
  )
}

export default App;
