import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import JobCard from "../Components/JobCard";
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useCookies } from "react-cookie";



export const CurrentWork =()=>{
    const [data, setData] = useState(null);
    const [cookies, setUserId] = useCookies(["userID"]);
    const [task, setTask] = useState(false);
    const [job, setJob] = useState(null);
    const [show, setShow] = useState(false);


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/Jobs/CurrentJob/' + cookies.userID;
        axios.get(apiUrl).then(response => { setData(response.data) })
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

    const handleClose = () => setShow(false);

    const handleShow = (e, job) => {
        e.preventDefault();   
        setShow(true);
        setJob(job);       
    };

    const handleAnswer = (e, answer) => {
        e.preventDefault();     
        job.dateComplite = new Date().toLocaleString();
        job.status = "Выполнено";
        job.answer = answer;

        const apiUrl = 'http://localhost:5000/api/Jobs/' + job.id;
        axios({
            method: 'put',
            url: apiUrl,
            data: job,
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        })
        setShow(false);
    };
           
    


    
    if (data !== null) {
        return (
            <>
            <Row className="d-flex">
                {data.map(job =>
                    <div>
                        <Row>
                            <Col md={10}>
                                <JobCard key={data.id} job={job} />
                            </Col>
                            <Col md={2}>
                                <Button className="float-end my-3" variant="success" type="submit" onClick={(e)=>{handleShow(e, job)}} id={job.id}>
                                   Завершить задание
                                </Button>
                            </Col>
                        </Row>
                        <ColoredLine color="black" />
                    </div>
                )}
            </Row>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {job !== null? job.name:'Пусто'} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>           
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ответ:</Form.Label>
              <Form.Control as="textarea" rows={5} id='answer'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={(e)=>{handleAnswer(e, document.getElementById('answer').value)}}>
            Завершить
          </Button>
        </Modal.Footer>
      </Modal>
      </>
        );
    } else {
        return (
            <h1>Пусто</h1>
        )
    }
}
export default CurrentWork