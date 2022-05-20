import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {useEffect} from "react";

const RequireAuth = ({}) => {
    const {setAuth} = useAuth();
    const location = useLocation();

    useEffect(() => {
        getLocalStorageAuth()
    }, [])

    const getLocalStorageAuth = async () => {
        let isAuth = localStorage.getItem("isAuth");
        if (isAuth === null) {
            return false;
        }
        let username = localStorage.getItem("username")
        let accessToken = localStorage.getItem("token")
        await setAuth({isAuth: true, username, accessToken})
        return true;
    }
    return (
        localStorage.getItem("isAuth")
            ? <Outlet/>
            : <Navigate to={"/login"} state={{from: location}} replace/>
    )
}

export default RequireAuth;