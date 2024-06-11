import {useContext,useState,useEffect} from 'react'
import { Card } from './Card'
import { GameContext } from "../provider/GameContext"
import { CarritoContext } from '../provider/CarritoContext'
import { useNavigate } from 'react-router-dom'
export const Category = ({category}) => {
    const { games } = useContext( GameContext )
    const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

    const navigate = useNavigate();

    const handleAgregar = (compra) =>{
        agregarCompra(compra)

      }
      const handleQuitar = (id) =>{
        eliminarCompra(id)
      }

    const onclick= (game) => {
        console.log(game.url)
        if(!game.url){navigate("/home")}
        else{navigate("/"+game.url)}
    }
  return (
    <>
        <div>
            <ul className="slide" id={category}>
                {games.map(game => (
                    (game.category === category) && (
                        <a key={game._id} className="game-card" onClick={() => onclick(game)}>
                            <Card
                                key={game._id}
                                titulo={game.titulo}
                                iconoEtiqueta={game.iconoEtiqueta}
                                precio={game.precio}
                                imagePath={game.imagePath}
                                category={game.category}
                                handleAgregar={() => handleAgregar(game)}
                                handleQuitar={() => handleQuitar(game._id)}
                            ></Card>
                        </a>
                    )
                ))}
            </ul>
        </div>
    </>
  )
}
