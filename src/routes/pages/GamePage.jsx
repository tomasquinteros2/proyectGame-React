import React, { useEffect, useRef } from 'react';
import { iniciarCanvas,reiniciarJuego,setNombre1,setNombre2 } from '../../js/juego';
const GamePage = () => {
    const canvasRef = useRef(null);
    const ganadorRef = useRef(null);
    const turnoRef = useRef(null);

    const nombre1 = useRef(null);
    const nombre2 = useRef(null);

    const tiempoRef = useRef(null);

    const ficha1Ref = useRef(null);
    const ficha2Ref = useRef(null);
    const ficha3Ref = useRef(null);
    const ficha4Ref = useRef(null);
    const ficha5Ref = useRef(null);
    const ficha6Ref = useRef(null);

    const linea4Ref = useRef(null);
    const linea5Ref = useRef(null);
    const linea6Ref = useRef(null);
    const linea7Ref = useRef(null);
    
    useEffect(()=>{
        iniciarCanvas(canvasRef.current,ganadorRef,turnoRef,nombre1,nombre2,tiempoRef,ficha1Ref,ficha2Ref,ficha3Ref,ficha4Ref,ficha5Ref,ficha6Ref,linea4Ref,linea5Ref,linea6Ref,linea7Ref)
    },[canvasRef])
    const menuGame = ()=>{
        document.querySelector('.canvas-form').style.display="flex";
        document.querySelector('.canvas').style.display="none";
    }
    //juegar 4 en linea
    //segundo play
    const playCanvas = ()=>{
        document.querySelector('.canvas').style.display="flex";
        document.querySelector('.canvas-form').style.display="none";
        reiniciarJuego()
    }
    //primer play
    const playGame = () => {
            document.querySelector('.section-image').style.display="none";
            document.querySelector('.canvas-form').style.display="flex";
            //setFichas(ficha1,ficha2,ficha3,ficha4,ficha5,ficha6)
            //ponerNombres(nombre1.current,nombre2.current)
        } 
    const restartGame = () => {
        reiniciarJuego()
    }
    const namePlayer1 = (event)=>{
        console.log(event.target.value)
        setNombre1(event.target.value)
    };
    const namePlayer2 = (event)=>{
        console.log(event.target.value)
        setNombre2(event.target.value)
    };
    return (
        <div className="game-container">
        
        <p className="breadcrums"><a href="/home">Home</a>/<a href="/game">Demon Slayer: 4 En Linea</a> </p>
        <section> 
            <div className="canvas-form">
                        <div>
                            <h2>Elige tu nombre y tu ficha</h2>
                        </div>
                        <div className="player">
                        <input 
                            type="text"
                            className="inputCanvas"
                            id="namePlayer1"
                            placeholder="jugador 1"
                            onChange={namePlayer1}
                        />
                        <div className="token" id="ficha1" ref={ficha1Ref}>
                            <img src="../img/4Enlinea/juego/ficha1.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha3" ref={ficha3Ref} >
                            <img src="../img/4Enlinea/juego/ficha3.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha5" ref={ficha5Ref}>
                            <img src="../img/4Enlinea/juego/ficha5.png" alt="ficha1" width="80px"/>
                        </div>
                    </div>
                    <div className="player">
                    <input 
                        type="text"
                        className="inputCanvas"
                        id="namePlayer2"
                        placeholder="jugador 2"
                        onChange={namePlayer2}
                    />
                        <div className="token" id="ficha2" ref={ficha2Ref}>
                            <img src="../img/4Enlinea/juego/ficha2.png" alt="ficha2" width="80px"/>
                        </div>
                        <div className="token" id="ficha4" ref={ficha4Ref}>
                            <img src="../img/4Enlinea/juego/ficha4.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha6" ref={ficha6Ref}>
                            <img src="../img/4Enlinea/juego/ficha6.png" alt="ficha1" width="80px"/>
                        </div>
                    </div>
                    <button className="button-play" id="play-game" onClick={playCanvas}>Jugar
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                    </button>
            </div>
            <div className="canvas">
                <h2 className="cantLinea">Cantidad en linea:</h2>
                <section className="menuCantLinea">
                    <div id="linea4" ref={linea4Ref}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-4-inline.png" alt=""/>
                    </div>
                    <div id="linea5" ref={linea5Ref}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-5-inline.png" alt=""/>
                    </div>
                    <div id="linea6" ref={linea6Ref}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-6-inline.png" alt=""/>
                    </div>
                    <div id="linea7" ref={linea7Ref}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-7-inline.png" alt=""/>
                    </div>
                </section>
                <div className="titles-canvas">
                    <h1 className="namePlayer1" id="titulo1" ref={nombre1}></h1>
                    <h1 className="namePlayer2" id="titulo2" ref={nombre2}></h1>
                </div>
                <h1 id="turno" ref={turnoRef}></h1>
                <h1 id="ganador" ref={ganadorRef}></h1>
                <canvas id="canvas" width="1140" height="543" ref={canvasRef}></canvas>

                <p id="tiempo" ref={tiempoRef}></p>
                <div className="menusGame">
                    <a id="restartGame" onClick={restartGame}>Reiniciar</a>
                    <a id="menuGame" onClick={menuGame}>Menu</a>
                </div>

                
            </div>
            <div className="section-image">
                <img className="bk-game-image" src="../img/4Enlinea/ImagenBorroneada2.png" alt="game-background"/>
                <div className="play-section">
                    <img className="game-image" src="../img/4Enlinea/4-en-linea.jpg" alt="game-image"/>
                    <div >
                        <button className="button-play" onClick={playGame}>
                        Jugar
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        </button>
                    </div> 
                </div>           
            </div>
            <div className="game-info">
                <h1>Demon Slayer: 4 En Linea</h1>
                <section className="info-section">
                    <div className="share-section">
                       <div className="item">
                        <img src="../img/icons/Boton-Compartir.png" alt=""/>
                       </div>
                    </div>
                </section>    
            </div>      
        </section>    
        
        <section className="game-instructions">
            <article>
                <h2>Instrucciones</h2>
                <p>En cada Turno cada jugador coloca una ficha de su tipo encima de la columna que desee y esta caerá.
                    El que consiga ubicar 4 fichas del mismo tipo seguidas en horizontal, vertical o en diagonal gana, si 
                    se completa el tablero y no gano ninguno, la partida termina.
                </p>
                <br/>
                <h2>Controles</h2>
                <p>-Click izquierdo = Para seleccionar ficha</p>
                <p>-Mantener Click izquierdo para llevar la ficha a la parte superior del tablero y soltarla donde desee</p>
            </article>
            <article>
                <img src="../img/4Enlinea/tableroarmado.png" alt="instructions-image"/>
            </article>   
        </section>
    </div>
    );
};

export default GamePage;