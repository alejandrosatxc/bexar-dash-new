import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const NavBJ = (props) => {

    return (
        <Navbar className = {styles.bg} collapseOnSelect expand="lg"  variant="dark" sticky="top" >
        <Navbar.Brand className = {styles.navbarbrand} href="https://bexarfacts.org">
        <Image src = "/bf-11.png" 
                width="280"
                height = "40"
                alt=""/> 
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/issues/localgovernment">Local Government</Nav.Link>
              <Nav.Link href="/issues/electedofficials">Elected Officials</Nav.Link>
              <NavDropdown title="Polls" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/polls/7">Poll 7</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2">Local Government</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Elected Officials</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
      </Navbar>

    )
}
export default NavBJ

