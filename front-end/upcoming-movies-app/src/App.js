import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Movies from './components/Movies'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Container>        
          <Jumbotron>          
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">Upcomming Movies Web App</Navbar.Brand>          
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">            
                <Form inline>
                  <Form.Control type="text" placeholder="Filter" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <Movies/>
          </Jumbotron>
        </Container>
      </Provider>
    </div>
  );
}

export default App
