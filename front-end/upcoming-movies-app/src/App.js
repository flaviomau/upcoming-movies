import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './redux'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Movies from './components/Movies'
import Detail from './components/Detail'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Container>        
          <Jumbotron>
            <BrowserRouter>
              <Switch>
                <Route path="/detail/:id" component={Detail} exact/>                
                <Route path="/" exact={true} component={Movies}/>
              </Switch>
            </BrowserRouter>            
          </Jumbotron>
        </Container>
      </Provider>
    </div>
  );
}

export default App
