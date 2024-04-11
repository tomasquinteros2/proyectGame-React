export const Header = () => {
  return (
    <>
        <div className="header">
            <div className="headerLeft"> 
                <a>
                    <img src="../images/icons/menuIcon.png"alt="boton menu navegacion desplegable" className="icon"id="menuHome"/>
                </a>  
            </div>
            <div className="search">
                <input type="text" name="search" id="searchInput" placeholder="   Buscar..."/>
            </div>
            <div className="headerRight">
                <div className="carritoContainer">
                    <img src="../images/icons/cartIcon.png" alt="carrito" className="icon"/>
                    <p id="carrito"></p>
                </div>
                <img src="../images/icons/userIcon.png" alt="boton menu usuario desplegable" className="icon"id="userMenu"></img>
            </div>
        </div>
    </>
  )
}
