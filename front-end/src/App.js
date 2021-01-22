import Listar from "./componentes/paginas/pessoas/Listar.js";
import Cadastrar from "./componentes/paginas/pessoas/Cadastrar.js";
import './index.css';
import { CSSTransition } from 'react-transition-group'
import Home from './componentes/paginas/pessoas/Home.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const routes = [
  { path: '/', Component: Home },
  { path: '/posts', Component: Listar },
  { path: '/ver/:id', Component: Ver},
  { path: '/cadastrar', Component: Cadastrar },
]

function App() {
  return (
    <>
    <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/">K-Dev</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Mensagens
                      </Link>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/cadastrar" id="btn-cadastrar">Nova mensagem</Link>
                        <Link className="dropdown-item" to="/">Lista de mensagens</Link>
                      </div>
                    </li>
                </ul> 
              </div>
          </nav>
      </div>
      <Switch>
          <div>
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      timeout={300}
                      classNames="page"
                      unmountOnExit
                    >
                      <div className="page">
                        <Component/>
                      </div>
                    </CSSTransition>
                  )}
                </Route>
              ))}
          </div>
      </Switch>
    </Router>
    </>
  );
}

function Ver () {

  let { id } = useParams();
  const buscarPessoa = () => {
    axios ({
      method: 'get',
      url: `http://localhost:8080/user/ver/${id}`
    }).then((resposta) => {
      //$("id").html('')
      document.querySelector("#id").innerText += resposta.data.id
      document.querySelector("#nome").innerText += resposta.data.name
      document.querySelector("#email").innerText += resposta.data.email
    })
  }

  useEffect(() => {
    buscarPessoa()
  }, [])

  return (
    <>
      <h1>Detalhes</h1>
      <div>
        <div id="id">Id: </div>
        <div id="nome">Nome: </div>
        <div id="email">Email: </div>
      </div>
    </>
  )
}

export default App;
