import '../Styles/navbar.css';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {useState} from "react";
import {Form} from "react-bootstrap";

const LOGOUT_URL = '/logout';


const HomeNav = () => {

    let navigate = useNavigate();

    const {auth, setAuth} = useAuth()

    const handleLogout = async () => {
        console.log(auth);
        try {
            await axios.get(LOGOUT_URL,
                JSON.stringify({username: auth.username}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                }
            );
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            localStorage.removeItem("isAuth")
            setAuth({})

            navigate("/login", {replace: true});
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='sidebar'>
            <div className='SidebarList'>
                <ul>

                    <li className='roow' onClick={() => { handleLogout().then(r => console.log("Logout successful"))}}>
                        Log out
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HomeNav