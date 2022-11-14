import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {useCookies} from "react-cookie";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Navigate, NavLink} from "react-router-dom";
import { Container } from 'react-bootstrap';


export const Auth =()=>{

  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [userID, setUserId] = useCookies(["userID"]);
  const [Login, setLogin] = useCookies(["login"]);
  const [isAuth, setAuth] = useState(false);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const regData = {
      Login: document.getElementById('login').value,
      Password: document.getElementById('password').value
    }
  
        if (regData.Login === '' || regData.Password ==='' ) {
      setError(true);
      setErrMessage("Вы заполнили не все поля!")

    } else { 
      setError(false);

      axios.post('http://localhost:5000/api/Auth', regData)
      .then(response => {
        setUserId("userID", response.data.id, {path: "/"});
        setLogin("login", response.data.login, {path: "/"});     
        setAuth(true);
        window.location.reload();
      })
      .catch(error => {
          if(error.response.status === 404){
            setErrMessage("Неверный логин или пароль"); 
          }else{
            setErrMessage("Упс... Что-то пошло не: "+ error.message);
          }
          setError(true)
      });  
    }
  };
  
  const errorMessage = () => {
    return (
        <div class="alert alert-danger" role="alert" style={{
          display: error ? '' : 'none',
        }}>
          {errMessage}
        </div>
    );
  };



  if (isAuth) return <Navigate to='/' />

    return(
       <div>
       
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
       
          <Card style={{width:600}} className="p-5">
          <div className="messages">{errorMessage()}</div> 
          <h3>Авторизация</h3>
          
      <Form.Group className="mb-3">
        <Form.Label>Логин</Form.Label>
        <Form.Control type="text" placeholder="Введитн логин"  id='login'/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" id='password'/>
      </Form.Group>

      <Form className="d-flex justify-content-between mt-2 pl-3 pr-3">
        <NavLink to="/registaration">Зарегистрироваться</NavLink>
      <Button  onClick={handleSubmit} variant="primary" type="submit">
        Войти
      </Button>
      </Form>
      </Card>
    </Container>
    </div>
    );
}