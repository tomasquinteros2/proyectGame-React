import React, { useRef } from 'react'
import { Category } from '../components/Category'
import { useState,useEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
    const [carrouseles, setCarrouseles] = useState([]);

    useEffect(() => {
            const carrouselElements = document.querySelectorAll(".slide");

            setCarrouseles(carrouselElements);
    },[])
    const getSlide= (nombre) => {
        let resultado; // Declara resultado fuera del forEach
        carrouseles.forEach((item) => {
            if (item.id === nombre) {
                resultado = item;
            }
        });
        return resultado;
    }
    const handleNextClick = ({ nombre }) => {
        const slideContainer = getSlide(nombre);
        if (slideContainer) {
            const newPosition = slideContainer.scrollLeft + slideContainer.offsetWidth;
            slideContainer.scrollLeft = newPosition;
        }
    };

    const handlePrevClick = ({ nombre }) => {
        const slideContainer = getSlide(nombre);
        if (slideContainer) {
            const newPosition = slideContainer.scrollLeft - slideContainer.offsetWidth;
            slideContainer.scrollLeft = newPosition;
        }
    };

    const categorias = [
        { id: 2, nombre: "multijugador"},
        { id: 3, nombre: "accion" },
        { id: 4, nombre: "disparos"},
        { id: 5, nombre: "carreras"},
        { id: 6, nombre: "cartas"},
    ];
    return (
            <>
                <ul>
                {categorias.map((cat) => (
                    <li key={cat.id}>
                        <section className="category">
                            <h2 className="game-category">{cat.nombre}</h2>
                            <button className="button-left btn-pre-anable" onClick={() => handlePrevClick({ nombre: cat.nombre })}>
                                <img src="../img/buttons/FLECHITA2.png" alt=""/>
                                <div className="transition"></div>
                            </button> 
                            <Category category={cat.nombre} />
                            <button className="button-right-mobile">
                                <img src="../img/icons/flechaderechaMobile.png" alt="button-right-mobile"/>
                            </button>
                            <button className="button-left-mobile">
                                <img src="../img/icons/flechaIzquierdaMobile.png" alt="button-left-mobile"/>
                            </button>                                        
                            <button className="button-right" onClick={() => handleNextClick({ nombre: cat.nombre })}>
                                <img src="../img/buttons/FLECHITA.png" alt="button-right"/>
                            </button>
                        </section>
                    </li>
                ))}
                </ul>
            </>
        );}