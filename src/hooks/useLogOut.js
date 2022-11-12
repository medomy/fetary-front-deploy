import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn, setUser } from "../store/reducers/user_slice/user_slice";

function useLogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return () => {
        dispatch(setUser(null));
        dispatch(setLoggedIn(false));
        sessionStorage.removeItem('user');
        navigate('/');
    }
}
export default useLogOut;