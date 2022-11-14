import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import ProfileCardSmall from "../Components/ProfileCardSmall";
import { Button, Row, Col } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import TaskCreate from './TaskCreate';



export const Contacts = () => {

    const [usersData, setUsersdata] = useState(null);
    const [task, setTask] = useState(false);
    const [_worker, setWorker] = useState(null);


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/Accounts/';
        axios.get(apiUrl).then(response => { setUsersdata(response.data) })
    }, [])

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );


    const handleTask = (e, user) => {
        e.preventDefault();
        setWorker(user);
        setTask(true);
        
    }


    if (task)  return <TaskCreate worker={_worker} />

    if (usersData !== null) {
        return (
            <Row className="d-flex">
                {usersData.map(user =>
                    <div>
                        <Row>
                            <Col md={10}>
                                <ProfileCardSmall key={user.id} user={user} />
                            </Col>
                            <Col md={2}>
                                <Button className="float-end my-3" variant="secondary" type="submit" onClick={(e)=>{handleTask(e, user)}} id={user.id}>
                                    Выдать задание
                                </Button>
                            </Col>
                        </Row>
                        <ColoredLine color="black" />
                    </div>
                )}
            </Row>
        );
    } else {
        return (
            <h1></h1>
        )
    }
}
export default Contacts