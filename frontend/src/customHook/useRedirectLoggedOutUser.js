import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from 'react-toastify';
 

const useRedirectLoggedoutUser = (path) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if(!isLoggedIn){
                toast.info("Session expired, Please login to continue.")
                navigate(path)
                return;
            }
        };
        redirectLoggedOutUser()
    }, [navigate, path, dispatch]);
}

export default useRedirectLoggedoutUser