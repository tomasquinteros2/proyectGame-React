import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { registerRequest,loginRequest, logoutRequest ,verifyTokenRequest} from '../../api/auth'
import { set } from 'react-hook-form'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {throw new Error("useAuth must be used within an AuthProvider")}
    return context;
    
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [errors,setErrors] = useState([])
    const [isAuthenticated,setisAuthenticated]=useState(false)

    // clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
        }
    }, [errors]);

    const navigate = useNavigate()

    const sigUp = async(user) =>{
        try{
            console.log(user)
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setisAuthenticated(true)
        }
        catch(e){
            console.log(e.response.data)
            setErrors(e.response.data)
        }
    }

    const sigIn =  async (user) => {
        try{
            const res = await loginRequest(user)
            setisAuthenticated(true)
        }
        catch(e){
            setErrors([e.response.data.message])
        }

    }
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setisAuthenticated(false);
        navigate("/login")
      };
    
    useEffect(()=>{
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setisAuthenticated(false);
                navigate('/login')
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data){
                    navigate('/login')
                    return setisAuthenticated(false);
                } 
                setisAuthenticated(true);
                setUser(res.data);
                } 
            catch (error) {
                setisAuthenticated(false);
            }
        };
        checkLogin();
    },[])
    return (
        <AuthContext.Provider value={{sigUp,user,isAuthenticated,errors,sigIn,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
