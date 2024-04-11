import React from 'react'

export const Card = (card,icono,etiqueta,tituloEtiqueta,imagen) => {
  return (
    <div>
        <a className="card" href={card}>
            <div className={etiqueta}>
                <div className="icon-etiqueta">
                    <img src={icono}/>
                </div>
                <h3 className="title-etiqueta">{tituloEtiqueta}</h3>
            </div>
            <div className="etiqueta-triangulo"></div>
                <div className="game-card-img">
                    <img src={imagen} alt={titulo}/>
                </div>
                <div className="card-info">
                <h3 className="card-title">{titulo}</h3>
            </div>
        </a>
    </div>
  )
}
