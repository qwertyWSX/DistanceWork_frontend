import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useCookies } from "react-cookie";
import ProfileCard from "../Components/ProfileCard";
import { Button } from 'react-bootstrap';



export const Profile = () => {

    const [cookies, setUserId] = useCookies(["userID"]);
    const [userData, setUserdata] = useState(null);
    useEffect(() => {
        const apiUrl = 'http://localhost:5000/api/Accounts/' + cookies.userID;
        axios.get(apiUrl).then(response => { setUserdata(response.data)})
    }, [])

    if (userData !== null) {

        return (
            <div>
                <ProfileCard user={userData} />
                <Button className="float-end my-5" variant="secondary" type="submit">
                    Редактировать
                </Button>
            </div>
        );
    } else {
        return (
            <h1></h1>
        )
    }
}
export default Profile