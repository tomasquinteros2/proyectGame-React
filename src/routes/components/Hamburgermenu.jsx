import React, { useState } from 'react'
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
export const Hamburgermenu = ({showMenu}) => {
    const navigate = useNavigate()
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const {logout} = useAuth()

    const isClicked = () =>{
        logout()
    }
    const navigateHome = (e) => {
        e.preventDefault();
        navigate("/home");
        setMenuOpen(false);
    };

  return (
    <>
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" checked={menuOpen} onChange={toggleMenu}/>
            <label className="menu__btn" htmlFor="menu__toggle">
                <span id='span1'></span>
                <span id='span2'></span>
                <span id='span3'></span>
            </label>
            <div className="menu__box">
                <p className='line1'></p>
                <ul>
                    <li><a className="menu__item" onClick={(navigateHome)}>Home</a></li>
                    <li><a className="menu__item" href="">About</a></li>
                    <li><a className="menu__item" href="">Contact</a></li>
                    <li><p className="menu__item" onClick={isClicked}>Log Out</p></li>
                </ul>
                <div className='social'>
                    <p className='line2'></p>
                    <ul className="iconoRedes">    
                        <li>
                            <a><img src="../img/icons/instagram-icon.svg" alt="link al instagram de Rattata" className="icon redes"/></a>
                        </li>
                        <li>
                            <a><img src="../img/icons/x-icon.svg" alt="link al twitter de Rattata" className="icon redes"/></a>
                        </li>
                    </ul>
                </div>  
            </div>
        </div>
    </>
  )
}
