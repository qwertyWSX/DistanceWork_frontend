import React from "react";
import { Nav, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const JobCard = (props) => {
  const [tab, setTab] = useState("Common");


  const TabMenu = () => {
   
    if (tab === "Common")
      return (
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Заказчик: {props.job.master}</ListGroup.Item>
          <ListGroup.Item>Исполнитель: {props.job.worker}</ListGroup.Item>
          <ListGroup.Item>Статус: {props.job.status}</ListGroup.Item>
        </ListGroup>
      )
    else if (tab === "Order")
     return  (
        <Card.Text>
          {props.job.comments}
        </Card.Text>
      )
    else if (tab === "Answer")
     return (
        <Card.Text>
          {props.job.answer}
        </Card.Text>
      )
      else if (tab === "AllInfo")
      return (
        <ListGroup className="list-group-flush">
          <ListGroup.Item>номер: #{props.job.id}</ListGroup.Item>
          <ListGroup.Item>Заказчик: {props.job.master}</ListGroup.Item>
          <ListGroup.Item>Исполнитель: {props.job.worker}</ListGroup.Item>
          <ListGroup.Item>дата создания: {props.job.dateBegin}</ListGroup.Item>
          <ListGroup.Item>срок выполнения: {props.job.deadline}</ListGroup.Item>
          <ListGroup.Item>дата завершения: {props.job.dateComplite}</ListGroup.Item>
          <ListGroup.Item>Статус: {props.job.status}</ListGroup.Item>
        </ListGroup>
      )
  }



  return (
    <Card
      bg='Light'
      key='Light'
      text='Light'
      style={{ width: '35rem' }}
      className="mb-2"
    >
      <Card.Header><b>{props.job.name}</b></Card.Header>

      <Nav variant="tabs" defaultActiveKey="#first">
        <Nav.Item>
          <Nav.Link onClick={()=>setTab("Common")}> Общее</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setTab("AllInfo")}>Подробнее</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setTab("Order")}>Текст задания</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>setTab("Answer")}>Текст ответа</Nav.Link>
        </Nav.Item>
      </Nav>

     {TabMenu()}
    </Card>
  );
}

export default JobCard;