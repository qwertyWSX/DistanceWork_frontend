import React from 'react';
import { ListGroup, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

import {Profile} from './Profile.jsx';
import {Contacts} from './Contacts.jsx';
import {CurrentWork} from './CurrentWork.jsx';
import {Assigned} from './Assigned.jsx';
import {SearchWork} from './SearchWork.jsx';
import {Archive} from './Archive.jsx';


export const Home =()=>{
  const [select, setSelect] = useState(0);   
  const [page, setPage] = useState(<Profile/>);  

  const getProfile = (e) => {
    e.preventDefault();
    setSelect(0);
    setPage(<Profile/>)    
  }

  const getContacts = (e) => {
    e.preventDefault();
    setSelect(1);
    setPage(<Contacts/>)    
  }

  const getCurrentWork = (e) => {
    e.preventDefault();
    setSelect(2);
    setPage(<CurrentWork/>)    
  }

  const getAssigned = (e) => {
    e.preventDefault();
    setSelect(3);
    setPage(<Assigned/>)    
  }

  const getAllWork = (e) => {
    e.preventDefault();
    setSelect(4);
    setPage(<SearchWork/>)    
  }

  const getArchive = (e) => {
    e.preventDefault();
    setSelect(5);
    setPage(<Archive/>)    
  }

  


    return(
      <Container>
         <Row className='mt-5'>
                <Col md={2}>
      <ListGroup as="ul">
      <ListGroup.Item  active={select===0} onClick={getProfile} style={{cursor: 'pointer'}}>
            Мой профиль
      </ListGroup.Item>
       <ListGroup.Item active={select===1} onClick={getContacts} style={{cursor: 'pointer'}}>
           Контакты
           </ListGroup.Item>
       <ListGroup.Item  active={select===2} onClick={getCurrentWork} style={{cursor: 'pointer'}}>
           Текущие задания
           </ListGroup.Item>      
           <ListGroup.Item active={select===3} onClick={getAssigned} style={{cursor: 'pointer'}}>
          Выданные задания
           </ListGroup.Item>

            {/*
           <ListGroup.Item active={select===4} onClick={getAllWork} style={{cursor: 'pointer'}}>        
          Поиск заданий
           </ListGroup.Item>
          */}
          
           <ListGroup.Item active={select===5} onClick={getArchive} style={{cursor: 'pointer'}}>
           Архив
           </ListGroup.Item>         
   </ListGroup>

    </Col>
                <Col md={1}>
                  
                </Col>
                <Col md={9}>
                  {page}
                </Col>
            </Row>
        </Container>
    )
}