import React, {Component} from "react";
import { FormControl, Nav, Navbar, Container, Form, Button} from "react-bootstrap";
import logo from './logo192.png';
import {Routes, Route, Link} from "react-router-dom";
import {Home} from '../Pages/Home';
import {Info} from '../Pages/Info.jsx';
import {Logout} from '../Pages/Logout.jsx';
import {Registartion} from '../Pages/Registration.jsx';
import {Auth} from '../Pages/Auth.jsx';
import {SuccessRegistration} from '../Pages/SuccessRegistration.jsx';
import TaskCreate from '../Pages/TaskCreate.jsx';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Header extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

      state = {
        login: this.props.cookies.get("login") || ""
      };

    
    
    render(){
        const { login } = this.state;

        return(
            <><Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} height="30" width="30" className="d-inline-block align-top" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Brand href="/">
                        <a className="nav-link disabled text-info" href="#" tabindex="-1" aria-disabled="true">DistanceWork</a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Link className="nav-link" to="/">Главная</Link>
                            <Link className="nav-link" to="/info">О сервисе</Link>
                            <Link className="nav-link" to="/Auth">Авторизация</Link>
                            <Link className="nav-link" to="/registaration">Регистрация</Link>
                            <Link className="nav-link" to="/logout">Выход</Link>                            
                        </Nav>
                        <Navbar.Brand href="/">
                        <a className="nav-link disabled text-white" href="#" tabindex="-1" aria-disabled="true">{login}</a>
                    </Navbar.Brand>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>                   
                        <Route path="/" element={<Home/>} />
                        <Route exact path="/info" element={<Info/>} />
                        <Route exact path="/registaration" element={<Registartion/>} />
                        <Route exact path="/logout" element={<Logout/>} /> 
                        <Route exact path="/Auth" element={<Auth/>} /> 
                        <Route exact path="/SuccessRegistration" element={<SuccessRegistration/>} /> 
                        <Route exact path="/TaskCreate" element={<TaskCreate/>} /> 
                   
            </Routes>

            </>
        );
    }
}
export default withCookies(Header);