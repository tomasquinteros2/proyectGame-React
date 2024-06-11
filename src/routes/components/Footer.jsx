import React from 'react'
import { useAuth } from '../provider/AuthProvider';
export const Footer = () => {
    const {isAuthenticated} = useAuth()
    const {logout} = useAuth()

    const isClicked = () =>{
        logout()
    }
    const isLogIn = () => {
        if(isAuthenticated){return true}
        return false
    }
  return (
    <>
        {isLogIn() ? 
        <>
            <footer className="footer-container">
            <div className="footer-grid">
                <section className="footer-logo-container">
                    <img src="../img/logoRattata.png" alt="logo Rattata" className="footer-logo"/>
                </section>
                <nav className="footer-nav">
                    <ul className="footer-links">
                        <h3>LINKS</h3>
                        <li><a href="/home">Home</a></li>
                        <li><a onClick={isClicked}>Log Out</a></li>
                    </ul>
                    <ul className="footer-links">
                        <h3>EMPRESA</h3>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Policies</a></li>
                        <li><a href="#">Cookies</a></li>
                    </ul>
                    <ul className="footer-links">
                        <h3>ASISTENCIA</h3>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Frequent's Questions</a></li>
                    </ul>
                </nav> 
            </div>
            <div className="line"></div>
            <section className="footer-social">
                <img src="../img/icons/facebookIcon.png" alt="link al facebook de Rattata"/>
                <img src="../img/icons/twitter.png" alt="link al twitter de Rattata"/>
                <img src="../img/icons/instagramIcon.png" alt="link al instagram de Rattata"/>
            </section>
        </footer>
        </>
        :
        <></>}
    </>
  );
};
