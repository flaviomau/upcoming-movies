import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Movies from './components/Movies'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Container>        
          <Jumbotron>            
            <Movies/>
          </Jumbotron>
        </Container>
      </Provider>
    </div>
  );
}

export default App
