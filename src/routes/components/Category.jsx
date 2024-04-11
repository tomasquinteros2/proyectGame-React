import React from 'react'
import { Card } from './Card'
export const Category = () => {
  return (
    <div>
        <section className="category">
            <h2 className="game-category">Recomendado para ti</h2>
            <button className="button-left">
                <img src="../img/buttons/FLECHITA2.png" alt=""/>
                <div className="transition"></div>
            </button> 
        <ul className="slide">
            
        </ul>
            <button className="button-right-mobile">
                <img src="../img/icons/flechaderechaMobile.png" alt="button-right-mobile"/>
            </button>
            <button className="button-left-mobile">
                <img src="../img/icons/flechaIzquierdaMobile.png" alt="button-left-mobile"/>
            </button>
            <button className="button-right">
                <img src="../img/buttons/FLECHITA.png" alt="button-right"/>
            </button>
    </section>
</div>
  )
}
