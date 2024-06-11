import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../provider/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schemas";
export const LoginPage = () => {

  const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(loginSchema),});

  const {sigIn,errors: loginErrors,isAuthenticated} = useAuth()

  const [showErrors, setShowErrors] = useState(true);

  const navigate = useNavigate()
  useEffect(() => {
      if(isAuthenticated){navigate('/home')}
  },[isAuthenticated])
  const handleRegister = () => {
    navigate('/register')
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowErrors(false);
    }, 5000);
    setShowErrors(true)
    return () => clearTimeout(timeout);
  }, [errors]);

  const onSubmit = (data) => {sigIn(data)};

  return (
    <>
      <div className="loginMain">
      <form onSubmit={handleSubmit(onSubmit)} className="form">        
        <h1>Login</h1>
        {showErrors && (
          <ul className="error-messages">
            {loginErrors.map((error, i) => (
              <li className='errorLogin' key={i}>{error}</li>
            ))}
          </ul>
        )}
        <input type="email" {...register('email')} className="input-register" placeholder="Email"/>
        {showErrors && errors.email && (
          <span className='errorLogin'>{errors.email.message}</span>
        )}
        <input type="password" {...register('password')} className="input-register" placeholder="Password"/>
        {showErrors && errors.password && <span className='errorLogin'>{errors.password.message}</span>}

        <div className='buttons-login'>
          <div className="btn-registros" onClick={handleRegister}>
            <p>Don't have an account?</p>
          </div>  
          <button type="submit" className="button" >Continue</button>
        </div>
      </form>
      </div>
    </>
  )
}
