import React from 'react'

export const MenuUser = () => {
  return (
    <>
        <nav id="menuU">
            <li className="perfilUser">
                <a className="menuList" href="#">
                    <img src="../img/icons/claroquesi.png" alt="claroquesi" className="icon-perfil"/>
                    <p>Josema</p>
                </a>
                <div className="line"></div>
            </li>
            <div className='line1'></div>
            <ul className="userList">
                <li className='listContainer'>
                    <a className="menuList" href="#">
                        <img src="../img/icons/userIcon.png" alt="mi perfil" className="icon"/>
                        <p>Mi perfil</p>
                    </a>
                </li>
                <li className='listContainer'>
                    <a className="menuList" href="#">
                        <img src="../img/icons/communityIcon.png" alt="mis amigos" className="icon"/>
                        <p>Mis amigos</p>
                    </a>
                </li>
                <li className='listContainer'>
                    <a className="menuList" href="#">
                        <img src="../img/icons/editionIcon.png" alt="administrar cuenta" className="icon"/>
                        <p>Administrar cuenta</p>
                    </a>
                </li>
                <div className="line"></div>
                <li className='listContainer'>
                    <a className="menuList" href="../html/index.html">
                        <img src="../img/icons/closeSessionIcon.png" alt="cerrar sesion" className="icon"/>
                        Cerrar sesion
                    </a>
                </li>
                <div className='line2'></div>
            </ul>
        </nav>
    </>
  )
}
