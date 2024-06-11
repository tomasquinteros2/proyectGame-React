import React, { useEffect, useState } from 'react'

export const Card = ({titulo,iconoEtiqueta,precio,imagePath,category,handleAgregar, handleQuitar}) => {
    const [etiqueta, setEtiqueta] = useState('free')
    const [added, setAdded] = useState(false)

    const clickAgregar = () => {
        handleAgregar()
        setAdded(true)
    }
    const clickQuitar = () => {
        handleQuitar()
        setAdded(false)
    }

    const getEtiqueta = () => {
        if(precio == 0){
            setEtiqueta('free')
        }
        else{
            setEtiqueta('premium')
        }
    }
    useEffect(()=>{
        getEtiqueta()
    },[])
    
    const imgUrl = new URL(`../../../img/games/`, import.meta.url).href
  return (
    <>      
                {etiqueta == 'premium' ? 
                    <div className={`etiqueta${etiqueta}`}>
                    <div className={"icon-etiqueta"}>
                        <img src={`../img/icons/${etiqueta}.png`}/>
                    </div>
                    <h3 className="title-etiqueta">{`$${precio}`}</h3>
                    </div>
                :
                    <div className={`etiqueta${etiqueta}`}>
                        <div className={"icon-etiqueta"}>
                            <img src={`../img/icons/${etiqueta}.png`}/>
                        </div>
                        <h3 className="title-etiqueta">{etiqueta}</h3>
                    </div>
                }
                <div className={`etiqueta-triangulo-${etiqueta}`}></div>
                <div className="game-card-img">
                    <img src={`${imgUrl}/${category}/${imagePath}`} alt={titulo}/>
                </div>
                {etiqueta == 'free'?
                <div className="card-info">
                    <h3 className="card-title">{titulo}</h3>
                </div>
                :
                <div className="card-info-premium">
                    <h3 className="card-title">{titulo}</h3>
                        {added ?
                            <button className="btn-agregar btn-remover-active" onClick={clickQuitar}>
                                <img className="carrito" src="../img/icons/btn-cart (1).png" alt="carrito"/>
                                <p className="info-btn-">-</p>
                            </button>
                        :
                            <button className="btn-agregar"  onClick={clickAgregar}>
                                <img className="carrito" src="../img/icons/btn-cart (1).png" alt="carrito"/>
                                <p className="info-btn">+</p>
                            </button>
                        }
                </div>
                }
        </>
  )
}
