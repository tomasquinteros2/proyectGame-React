import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {registerRequest} from "../../api/auth"
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
export const RegisterPage = () => {
    const showForm = () => {
        let formRegister = document.querySelector("#form-register");

        formRegister.classList.add("showForm");
    }
    const {register,handleSubmit, formState: { errors },} = useForm()
    const {sigUp,isAuthenticated, errors: RegisterErrors} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuthenticated){navigate('/home')}
    },[isAuthenticated])
    
    const onSubmit = handleSubmit(async (values) =>{
        sigUp(values)
    })

  return (
    <>
        <div className="register-container">
            <div className="google-btn">
                <img src="../img/icons/IconGoogle.png" alt="" className="google-icon"/>
                <p id="icon-google-p">Iniciar sesion con Google</p>
            </div>
            <div className="facebook-btn">
                <img src="../img/icons/faceIcon.png" alt="" className="facebook-icon"/>
                <p>Continuar con Facebook</p> 
            </div>
            <div className="btn-register" onClick={showForm}>
                <p>Registarse con Correo Electronico</p> 
            </div>
            <a href="../login" className="btn-Irlogin">
                    <p>O Inicia sesion</p> 
            </a>
            <div id="form-register">
                <div className="title">
                    <h1>Crea tu cuenta</h1>
                </div>
                <form onSubmit={onSubmit} className="form">
                        {RegisterErrors.map((error, i) => (
                            <div message={error} key={i}>{error}</div>
                        ))}
                        <input type="name" {...register("name",{required:true})} className="input-register" placeholder="Nombre de usuario"/>
                        {errors.username?.message && 
                        (<p className="text-red-500">{errors.username?.message}</p>)}
                        
                        <input type="email" {...register("email",{required:true})}  className="input-register" placeholder="Correo electronico"/>
                        {errors.email?.message && 
                        (<p className="text-red-500">{errors.email?.message}</p>)}
                        
                        <input type="password" {...register("password",{required:true})}  className="input-register" placeholder="Contraseña"/>
                        {errors.password?.message && 
                        (<p className="text-red-500">{errors.password?.message}</p>)}
                        <button type="submit" className="button">Continuar</button>
                        <a href="../html/index.html">
                            <p>ya tienes una cuenta?</p>
                        </a>
                </form>
            </div>
        </div>
    </>
  )
}
