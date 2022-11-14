import { Button, Col, Form, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import {Account} from '../data/Account.js';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import {SuccessRegistration} from './SuccessRegistration';
import photo from '../avatars/unknown.jpg';



export const Registartion =()=>{

const [error, setError] = useState(false);
const [userId, SetUserId] = useState(null);
const [errMessage, setErrMessage] = useState("");
const [fileURL, setFileURL] = useState();
const [file, setFile] = useState();


const fileReader = new FileReader();
fileReader.onloadend = () =>{
  setFileURL(fileReader.result);
}


const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.set('login', document.getElementById('login').value);
  formData.set('password', document.getElementById('password').value);
  formData.set('name', document.getElementById('name').value);
  formData.set('lastName', document.getElementById('lastname').value);
  formData.set('birthDate', document.getElementById('birthdate').value);
  formData.set('company', document.getElementById('company').value);
  formData.set('telNumber', document.getElementById('telNumber').value);
  formData.set('email', document.getElementById('email').value);
  formData.set('file', file);

      if (document.getElementById('login').value === '' || document.getElementById('password').value ==='' || document.getElementById('name').value === '' || document.getElementById('lastname').value ==='') {
    setError(true);
    setErrMessage("Вы заполнили не все обязательные поля!")
  } else { 
    setError(false); 

    axios.post('http://localhost:5000/api/Accounts', formData, {headers: {"Content-Type": "multipart/form-data"}})
      .then(response => {
        SetUserId(response.data.id);
      })
      .catch(error => {
          if(error.response.status === 409){
            setErrMessage("Это логин уже занят! Придумайте другой..."); 
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

const onFileChange = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  fileReader.readAsDataURL(file);
  setFile(file);
};


if (userId != null) return <Navigate to='/SuccessRegistration' />

    return(
         <div className='mx-auto w-25 mt-3'>        
 <Form expand="md">

      <div className="messages">
        {errorMessage()}              
      </div>   

      <Form.Group className="mb-3" >
        <Form.Label>Логин*</Form.Label>
        <Form.Control  id='login' type="text" placeholder="Введите логин"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль*</Form.Label>
        <Form.Control id='password' type="password" placeholder="Введите пароль" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя*</Form.Label>
        <Form.Control id='name' type="text" placeholder="Ваше имя" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Фамилия*</Form.Label>
        <Form.Control id='lastname' type="text" placeholder="Ваша фамилия" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Дата рождения*</Form.Label>
        <Form.Control id='birthdate' type="text" placeholder="Введите дату рождения" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Компания</Form.Label>
        <Form.Control id='company' type="text" placeholder="Введите название компании" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Телефон</Form.Label>
        <Form.Control id='telNumber' type="text" placeholder="Ваш номер телефона" />      
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>  
        <Form.Control id='email' type="text" placeholder="Ваш e-mail адрес" />      
      </Form.Group>

      <Form.Group className='mb-3'>
        <input type="file" onChange={onFileChange} accept='image/*,.jpg' />     
      </Form.Group>

      <Form.Group className='mb-3' as={Col} md={7}>
      <img src={fileURL? fileURL : photo} className="img-fluid"/>
      </Form.Group>

      <Form.Text className="text-muted">
         *Поля обязательные к заполнению
    </Form.Text>

      <Button onClick={handleSubmit} className="float-end my-3" variant="primary" type="submit">
        Регистрация
      </Button>
    
    </Form>
        </div>
    );
}