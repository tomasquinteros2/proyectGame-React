import { useState,useEffect } from "react";
import { Category } from "./Category";
import { useContext } from "react"
import { CarritoContext } from "../provider/CarritoContext";
import { Hamburgermenu } from './Hamburgermenu';
import { useAuth } from '../provider/AuthProvider'
export const Header = () => {
    const imgUrl = new URL(`../../../img`, import.meta.url).href
    const { listaCompras } = useContext(CarritoContext)

    const {isAuthenticated} = useAuth()


    const isLogIn = () => {
        if(isAuthenticated){
            return true}
        else{
            return false} 
    }
  return (
    <>  
        {isLogIn() ? 
            <>
                <div className="dark-background"></div>
                <header className="header">
                <Hamburgermenu></Hamburgermenu>
                    <div className="headerRight">
                        <div className="carritoContainer">
                            <img src={`${imgUrl}/icons/btn-cart`} alt="carrito" className="icon"/>
                            {listaCompras.length > 0?
                                <p id="carrito" className="show">{listaCompras.length}</p>
                            :
                                <p id="carrito">{listaCompras.length}</p>
                            }
                        </div>
                    </div>      
                </header>
            </>:
            <>
            <div className="dark-background"></div>
                <header className="header logOut">
                    <img className="logoR" src={`${imgUrl}/logoRattata.png`}/>     
                </header>
            </>
        }
    </>
  )
}

