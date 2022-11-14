import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import JobCard from "../Components/JobCard";
import { Button, Row, Col } from 'react-bootstrap';
import { useCookies } from "react-cookie";



export const Assigned =()=>{
    const [data, setData] = useState(null);
    const [cookies, setUserId] = useCookies(["userID"]);


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/Jobs/Assigened/' + cookies.userID;
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

    const CancelTask = (e, job) => {
        e.preventDefault();     
        job.dateComplite = new Date().toLocaleString();
        job.status = "Отменено";

        const apiUrl = 'http://localhost:5000/api/Jobs/' + job.id;
        axios({
            method: 'put',
            url: apiUrl,
            data: job,
            headers:{'Content-Type': 'application/json; charset=utf-8'}
        })
           
    }






    if (data !== null) {
        return ( 
            <Row className="d-flex">
                {data.map(job =>
                    <div>
                        <Row>
                            <Col md={10}>
                                <JobCard key={data.id} job={job} />
                            </Col>
                            <Col md={2}>
                                <Button className="float-end my-3" variant="danger" type="submit" onClick={(e)=>{CancelTask(e, job)}} id={job.id} >
                                   Отменить задание
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
export default Assigned