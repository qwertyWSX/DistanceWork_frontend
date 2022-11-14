import React from 'react';
import { ListGroup, ListGroupItem} from "react-bootstrap";
import { useEffect, useState } from 'react';
import {Routes, Route, Link} from "react-router-dom";



const TypeBar =()=>{

    const [select, setSelect] = useState(0);   

    return(

        <ListGroup as="ul">
       <ListGroup.Item  active={select===0} onClick={(e) => setSelect(0)} style={{cursor: 'pointer'}}>
       <Link className="nav-link" to="/contacts">Профиль</Link>
       </ListGroup.Item>
        <ListGroup.Item active={select===1} onClick={(e) => setSelect(1)} style={{cursor: 'pointer'}}>
            Контакты
            </ListGroup.Item>
        <ListGroup.Item  active={select===2} onClick={(e) => setSelect(2)} style={{cursor: 'pointer'}}>
            Текущие задания
            </ListGroup.Item>
        <ListGroup.Item active={select===3} onClick={(e) => setSelect(3)} style={{cursor: 'pointer'}}>
            Архив заданий
            </ListGroup.Item>
        <ListGroup.Item active={select===4} onClick={(e) => setSelect(4)} style={{cursor: 'pointer'}}>
            Поиск заданий
            </ListGroup.Item>
            
    </ListGroup>
       
    );
}
export default TypeBar;