import React from 'react'

export const HomePage = () => {
  return (
    <div>
        <section className="category">
            <h2 className="game-category">Recomendado para ti</h2>
            <button className="button-left">
                <img src="../img/buttons/FLECHITA2.png" alt=""/>
                <div className="transition"></div>
            </button> 
            <ul className="slide">
                <li className="game-card">
                    <a className="card" href="/4-en-linea">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                                <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                            <div className="game-card-img">
                                <img src="../img/games/multijugador/4EnlineaDemonSlayer.png" alt="demons slayer: 4 en linea"/>
                            </div>
                            <div className="card-info">
                                <h3 className="card-title">demon Slayer: 4 en linea</h3>
                        </div>
                    </a>
                </li>
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/carreras/highwayracer.jpg" alt="highwayracer"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Highway Racer</h3>
                        </div>
                    </a>
                </li>
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/multijugador/fire-and-water.jpg" alt="fuego y agua"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Fuego y Agua</h3>
                        </div>
                    </a>
                </li>
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/multijugador/lol-new-logo.jpg" alt="lol-new-logo"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Vida Socialn`t</h3>
                        </div>
                    </a>
                </li>
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/carreras/crazyforspeed.jpg" alt="crazyforspeed"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Crazy For Speed</h3>
                        </div>
                    </a>
                </li>
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/pool/8ballpool.webp" alt="8ballpool"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">8 Ball Pool</h3>
                        </div>
                    </a>
                </li>  
                <li className="game-card">
                    <a href="">
                        <div className="etiquetapremium">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/premium.png"/>
                            </div>
                            <h3 className="title-etiqueta">$0.30</h3>
                        </div>
                        <div className="etiqueta-triangulo-premium"></div>
                        <div className="game-card-img">
                            <img src="../img/games/carreras/superstarcar.jpg" alt="superstarcar"/>
                        </div>
                        <div className="card-info-premium">
                            <h3 className="card-title">Super Star Car</h3>
                            <button className="btn-agregar">
                                <img className="carrito" src="../img/icons/btn-cart (1).png" alt="carrito"/>
                                <p className="info-btn">+</p>
                                <p className="info-btn-">-</p>
                            </button>
                        </div>
                    </a>
                </li> 
                <li className="game-card">
                    <a className="card" href="home.html">
                        <div className="etiquetafree">
                            <div className="icon-etiqueta">
                                <img src="../img/icons/free.png"/>
                            </div>
                            <h3 className="title-etiqueta">free</h3>
                        </div>
                        <div className="etiqueta-triangulo"></div>
                        <div className="game-card-img">
                            <img src="../img/games/multijugador/soccerlegends.jpg" alt="8ballpool"/>
                        </div>
                        <div className="card-info">
                            <h3 className="card-title">Soccer Legends</h3>
                        </div>
                    </a>
                </li>   
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
