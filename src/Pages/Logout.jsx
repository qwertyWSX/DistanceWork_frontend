import { useCookies } from "react-cookie";
import {Navigate} from "react-router-dom";

export const Logout =()=>{
    const [userID, setUserId, removeId] = useCookies(["userID"]);
    const [Login, setLogin, removeLogin] = useCookies(["login"]);

    function handleRemoveCookie() {
        removeId("userID");
        removeLogin("login");
      }

    handleRemoveCookie();
    return(      
        <Navigate to='/Auth' />
    )
}