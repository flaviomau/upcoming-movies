import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'

function App() {
  return (
    <div className="App">
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
        </Jumbotron>
      </Container>
    </div>
  );
}

export default App
