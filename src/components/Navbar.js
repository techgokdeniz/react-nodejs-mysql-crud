import React from 'react'
import { Navbar, Container,Nav } from 'react-bootstrap'
import Logo from '../logo.svg'

function Navigation() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
                    <Navbar.Brand>
                        <img src={Logo} alt='logo' width="40px" height="40px" />{' '}
                        CRUD
                    </Navbar.Brand>
                    <Navbar.Toggle className="coloring" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="/">Anasayfa</Nav.Link>
                            <Nav.Link href="/add">Veri Ekle</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation
