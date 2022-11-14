import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import JobCard from "../Components/JobCard";
import { Button, Row, Col } from 'react-bootstrap';
import { useCookies } from "react-cookie";


export const Archive =()=>{
    const [data, setData] = useState(null);
    const [cookies, setUserId] = useCookies(["userID"]);


    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/Jobs/' + cookies.userID;
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






    if (data !== null) {
        return (
            <Row className="d-flex">
                {data.map(job =>
                    <div>
                        <Row>
                            <Col md={10}>
                                <JobCard key={data.id} job={job} />
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

export default Archive