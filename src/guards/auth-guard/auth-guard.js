import { useNavigate } from "react-router-dom";
function useAuthGuard(isLoggedIn,path){
    const navigate = useNavigate();
    if(!isLoggedIn) navigate(path);
}

export default useAuthGuard;