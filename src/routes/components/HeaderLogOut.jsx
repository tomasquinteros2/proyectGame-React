import React from 'react'

export const HeaderLogOut = () => {
  return (
    <>  
    <div className="dark-background"></div>
    <header className="header">
        <Hamburgermenu></Hamburgermenu>
        <div className="headerRight">
            <div className="carritoContainer">
                <img src={`${imgUrl}/icons/btn-cart.svg`} alt="carrito" className="icon"/>
                {listaCompras.length > 0?
                    <p id="carrito" className="show">{listaCompras.length}</p>
                :
                    <p id="carrito">{listaCompras.length}</p>
                }
            </div>
        </div>
    </header>
</>
  )
}
