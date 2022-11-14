import React from "react";
import photo from '../avatars/unknown.jpg';
import { ListGroup, Row, Col, Container } from 'react-bootstrap';

const ProfileCardSmall = (props) => {

    return (
        <Container>
        <Row>
          <Col xs={2}>
          <img src={props.user.filePath?"http://localhost:5000/images/" + props.user.login +".jpg" :photo} className="img-fluid"/>
          </Col>
          <Col>
            <h4 className="ms-5">{props.user.lastName} {props.user.name}</h4>  
            <div className="ms-5 ">Логин: {props.user.login}</div>        
            <div className="ms-5 ">Компания: {props.user.company}</div>
            <div className="ms-5 ">Рейтинг: {props.user.rank}/10</div>
          </Col>
        </Row>
      </Container>
    );
}

export default ProfileCardSmall;