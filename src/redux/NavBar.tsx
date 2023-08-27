import React from 'react'
import { Navbar,Nav, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"

const NavBar = () => {
  const count=useSelector((state:any)=>state.counter.value)
  const dispatch=useDispatch<any>()
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"><h3>SHOPNOW</h3></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#"><Link to={"/"}>Home</Link></Nav.Link>
            <Nav.Link href="#features"><Link to={"/cart"}>{`Cart ${count}`}</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
