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
            const token = res.data.token
            console.log(token)
            setItemWithExpiry('token', token, 3600);
            //Cookies.set('token', token, {expires:"1h", secure: true, sameSite: 'strict' });
            setisAuthenticated(true)
        }
        catch(e){
            setErrors([e.response.data.message])
        }

    }
    const logout = async() => {
        Cookies.remove("token");
        localStorage.removeItem('token')
        setUser(null);
        setisAuthenticated(false);
        navigate("/login")
        try{
            await logoutRequest()
        }
        catch(e){
            console.error(e)
        }
      };
    const setItemWithExpiry = (key, value, expirySeconds) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + (expirySeconds * 1000)
        };
        localStorage.setItem(key, JSON.stringify(item));
    };

    // Función para obtener un elemento de localStorage y verificar su expiración
    const getItemWithExpiry = (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        console.log(item+"item")
        const now = new Date();
        console.log(item.expiry+"item "+"<"+now.getTime())
        if (now.getTime() > item.expiry) { // Si la fecha actual es mayor que la fecha de expiración, elimina el item
            localStorage.removeItem(key);
            return null;
        }
        return item;
    };
    useEffect(()=>{
        const checkLogin = async () => {
            const token = getItemWithExpiry('token');
            console.log(token)
            if (!token) {
                console.log("no hay token")
                setisAuthenticated(false);
                navigate('/login')
                return;
            }
            try {
                console.log("si hay token",token)
                const res = await verifyTokenRequest(token.value);
                console.log(res)
                if (res.status === 400){
                    navigate('/login')
                    return setisAuthenticated(false);
                }
                if (window.location.pathname === '/') {
                    navigate('/home');
                    return;
                } 
                setisAuthenticated(true);
                setUser(res.data);
                
                } 
            catch (error) {
                setisAuthenticated(false);
                navigate('/login');
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
