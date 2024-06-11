/*import React from 'react';
import { useContext, useState } from 'react'
import { set } from 'react-hook-form'
import { useEffect } from 'react'
import { JuegoContext } from './juegoContext';
import { get } from 'mongoose';
import Jugador from "./Jugador"
import EspacioTablero from './EspacioTablero';
import Ficha from './Ficha';
export const useCanvas = () => {
    const context = useContext(JuegoContext)
    if(!context) {throw new Error("useAuth must be used within an AuthProvider")}
    return context;
}
export const Juego = ({children}) => {
        const [titulo,setTittle] = useState()
        // Lógica para dibujar el tablero...
        const [canvas, setCanvas] = useState()
        //arreglodeespaciosCHATO
        //se usa para el draw
        const [arreglosDeEspacios, setArreglosDeEspacios] = useState([])
        //arreglo de columnas
        //se usa para la logica
        const [matriz, setMatriz] = useState([])
        //arreglos de fichas
        const [fichasJugador1, setFichasJugador1] = useState([])
        const [fichasJugador2, setFichasJugador2] = useState([])
        //arreglo de dropZone
        const [dropZones, setdropZones] = useState([])
        //por default arranca en 4 la cantidad en linea
        let cantEnLinea = 4;
        let numFilas = 6;
        let numColumn = 7;
        //tamanio de casillero
        let TAMESPACIO = 60;
        //tamanio de la ficha
        let TAMANIOFICHA = 30;
        const alturaTablero = (numFilas*TAMESPACIO);
        const largoTablero = (numColumn*TAMESPACIO);
        const [canvasWidth, setCanvasWidth] = useState(null)
        const [canvasHeight, setCanvasHeight] = useState(null)
        const [ctx, setCtx] = useState()
        let cantidadFichas = numFilas * numColumn;
        //jugadores
        let jugador1 = new Jugador("",1);
        let jugador2 = new Jugador("",2);
        const [turno, setTurno] = useState()
        const [fichaActual, setFichaActual] = useState()
        const [pos, setPos] = useState()
        const [intervalo, setIntervalo] = useState()
        const [fichaAnimada, setFichaAnimada] = useState()
        const [fichaMenu1, setFichaMenu1] = useState()
        const [fichaMenu2, setFichaMenu2] = useState()
        const [fichaMenu3, setFichaMenu3] = useState()
        const [fichaMenu4, setFichaMenu4] = useState()
        const [fichaMenu5, setFichaMenu5] = useState()
        const [fichaMenu6, setFichaMenu6] = useState()
    //console.log(fichaMenu1)
    useEffect(() => {
        setTurno(jugador1)
        setFichaActual(null)
        setPos(0)
        setIntervalo(0)
        setFichaAnimada(null)

        setFichaMenu1(null)
        setFichaMenu2(null)
        setFichaMenu3(null)
        setFichaMenu4(null)
        setFichaMenu5(null)
        setFichaMenu6(null)
        console.log("primer renderizado")
    },[])
    useEffect(() => {
            if(canvas){
                console.log("canvas")
                const context = canvas.getContext("2d");
                setCtx(context);
                setCanvasHeight(canvas.height)
                setCanvasWidth(canvas.width)
                let turno = jugador1;
                drawFigures();
            }
    },[canvas])
    useEffect(()=>{
        if(canvas){
            cargarTablero();
            console.log("cargar tablero")
            canvas.addEventListener("mouseup",handleMouseUp)
            canvas.addEventListener("mousedown",handleMouseDown)
            canvas.addEventListener("mousemove",handleMouseMove)
            canvas.addEventListener("mouseleave",handleMouseLeave)
        }
    },[ctx])
    useEffect(()=>{
        console.log(titulo)
        console.log(turno)
    })
    //imagenes
    let imgFichaJugador1 = "../img/4Enlinea/juego/ficha1.png";
    let imgFichaJugador2 = "../img/4Enlinea/juego/ficha2.png";
    const imgEspacio = "../img/4Enlinea/juego/espacio.png";
    const ficha1 = "../img/4Enlinea/juego/ficha1.png";
    const ficha2 = "../img/4Enlinea/juego/ficha2.png";
    const ficha3 = "../img/4Enlinea/juego/ficha3.png";
    const ficha4 = "../img/4Enlinea/juego/ficha4.png";
    const ficha5 = "../img/4Enlinea/juego/ficha5.png";
    const ficha6 = "../img/4Enlinea/juego/ficha6.png";
    const dropimg = "../img/4Enlinea/juego/flecha-abajo.png";
    const fondo = "../img/4Enlinea/juego/fondo6.png";
    let imgFondo= new Image();
    imgFondo.src = fondo;
    const setFichas = (ficha1,ficha2,ficha3,ficha4,ficha5,ficha6) => {
        setFichaMenu1(ficha1.current)
        setFichaMenu2(ficha2.current)
        setFichaMenu3(ficha3.current)
        setFichaMenu4(ficha4.current)
        setFichaMenu5(ficha5.current)
        setFichaMenu6(ficha6.current)
    }
    //se carga el tablero y las fichas
    const handleMouseUp = () => {
        //si hay una ficha agarrada
        if(fichaActual!=null){
            //se obtiene la pos de la ficha
            let x = fichaActual.getX();
            let y = fichaActual.getY();
            //recorro todos los dropzone
            for(let i =0;i<dropZones.length;i++){
                //si la ficha esta arriba de alguno
                if(dropZones[i].detectarFicha(x,y)){
                    insertarFicha(i);
                    cambiarTurno();
                    setFichaActual(null)
                   // console.log("fichaActual3"+fichaActual)
                }
            }
            //si la ficha no estaba en ningun dropzone vuelve a su pos inicial
            if(fichaActual != null){
                fichaActual.posInicial();
                setFichaActual(null)
                drawFigures()
            }
        }
    }
    const setGanador = (ganadorRef) => {
        setWinner(ganadorRef.current)
    }

    const cargarTablero = () => {
        if(ctx){
            //cantidad de fichas para completar el tablero
            let cantidadFichas = numFilas * numColumn;
            let posicionTableroX = (canvasWidth/2)-(((numColumn)*TAMESPACIO)/2);
            let posicionTableroY = (canvasHeight/2)-(((TAMESPACIO)*(numFilas))/2);
            let widhtBoard = (numColumn * (TAMESPACIO));
            let heightBoard = (numFilas * (TAMESPACIO));

            //se inicializa el primer espacio en la esquina superior derecha
            let posicionEspacioX = posicionTableroX;
            let posicionEspacioY = posicionTableroY;   
            
            //recorro todas las filas
            for(let i=0;i<numFilas;i++){
                //a cada pos[i] le cargo un arreglo que es una fila
                let fila=[];
                //recorrolasColumnas
                for(let j=0;j<numColumn;j++){
                    if(j==0){
                        //vuelve al inicio
                        posicionEspacioX = posicionTableroX;
                    }
                    //creo el espacio
                    let rect = addEspacio(posicionEspacioX,posicionEspacioY);
                    posicionEspacioX+=TAMESPACIO;
                    fila.push(rect); 
                }
                //se pushea a la matriz la fila completa
                matriz.push(fila)
                posicionEspacioY+=TAMESPACIO;
            }
            //console.log(matriz)
            //cargo los dropZone
            for(let i = 0; i < numColumn; i++){
                let x = posicionTableroX + (i*TAMESPACIO);
                //se posicionan arriba de la primer fila
                let y = posicionTableroY - (TAMESPACIO);
                let zona = new EspacioTablero(x,y,TAMESPACIO,ctx);
                dropZones.push(zona);
            }
            //cargarFichas
            let posx1 = (posicionTableroX - TAMESPACIO*2);
            let posx2 = (posicionTableroX+largoTablero) +TAMESPACIO*2
            //la pos de Y va decreciendo por ficha
            let posYregresiva = canvasHeight - alturaTablero/2;
            for(let i = 0; i < cantidadFichas/2; i++){
                //fichas jugador 1
                //si llega a cierta altura empieza a apilar al lado
                if(posYregresiva<TAMESPACIO*2){
                    posYregresiva = canvasHeight - alturaTablero/2;
                    posx1 = (posicionTableroX - TAMESPACIO*3);
                    posx2 = (posicionTableroX+largoTablero) +TAMESPACIO*3
                }
                let fichaJugador1 = new Ficha(posx1, posYregresiva, TAMANIOFICHA, ctx, jugador1);
                fichasJugador1.push(fichaJugador1);
                //fichas jugador 2
                let fichaJugador2 = new Ficha(posx2, posYregresiva, TAMANIOFICHA, ctx, jugador2);
                fichasJugador2.push(fichaJugador2);
                //sube en Y
                posYregresiva -= 10;
            }
            posYregresiva = canvasHeight - alturaTablero/2;
        }
    }
    //crea un espacio del tablero y lo pushea al arreglo de espacios
    const addEspacio = (locationX,locationY) => {
        let rect = new EspacioTablero(locationX,locationY,TAMESPACIO,ctx);
        arreglosDeEspacios.push(rect);
        return rect;
    }
    function drawFigures(){
        clearCanvas();
        if(ctx){ctx.drawImage(imgFondo,0,0,canvasWidth,canvasHeight)}
        for(let i = 0; i<dropZones.length; i++){
            dropZones[i].drawImg(dropimg)
        }
        for(let i = 0;i<fichasJugador1.length;i++){
            fichasJugador1[i].drawImg(imgFichaJugador1);
            fichasJugador2[i].drawImg(imgFichaJugador2);
        }
        for(let i = 0; i<arreglosDeEspacios.length; i++){
            arreglosDeEspacios[i].drawImg(imgEspacio);
        }
        ponerNombres();
    }
    //obtiene los nombres y si estan vacios los setea como jugador 1 y 2
    const ponerNombres = (name1,name2) => {
        if(jugador1.getNombre == ''){
            jugador1.setNombre = "jugador1";
        }
        else if(jugador1.getNombre == ''){
            jugador1.setNombre = "jugador2";
        }
        if(name1 && name2){
                name1.innerHTML = jugador1.getNombre();
                name2.innerHTML = jugador2.getNombre();
        }
    }
    const setNamePlayer1 = (player,titulo1) => {
        if(player){
            nombre1 = titulo1
            jugador1.setNombre(player)
        }
    }
    const setNamePlayer2 = (player,titulo2) => {
        if(player){
            nombre2 = titulo2
            jugador2.setNombre(player)
        }
    }
    let cronometro = 0;
    //funcion de cronometro
    function iniciarTiempo(boolean){
        let element = document.getElementById("tiempo");
        //setea la cantidad de minutos
        let cantminutos = 3;
        //se pasa a segundos
        let tiempo = cantminutos * 60;
        //si se recibio un true
        if(boolean){
            cronometro = setInterval(()=>{
                let minutos = Math.floor(tiempo / 60);
                let segundos = tiempo % 60;
                //si segundos es < 10 coloca un 0 adelante
                segundos = segundos < 10 ? '0' + segundos : segundos;
                element.innerHTML = `${minutos}:${segundos}`;
                //si llega a cero finaliza el juego como Empate
                if(minutos == 0 && segundos == 0){
                    clearInterval();
                    finalizarJuegoEmpate();

                }
                else{
                    tiempo--;
                }
            }, 1000);
        }
        else{
            //si se recibe un false termina el intervalo
            clearInterval(cronometro);
        }
    }
    const [ganador,setWinner] = useState(null)
    function finalizarJuegoEmpate(){
        //frena el tiempo
        iniciarTiempo(false);
        titulo.style.display ="none";
        ganador.style.display = "block";
        ganador.innerHTML = `Empate, Se acabo el tiempo`;
        //setea a las fichas para q no se puedan mover
        for(let i = 0; i < fichasJugador1.length; i++){
            fichasJugador1[i].ponerEnTablero(false);
            fichasJugador2[i].ponerEnTablero(false);
        }
    }
    function finalizarJuego(){
        //frena el tiempo
        iniciarTiempo(false);
        titulo.style.display ="none";
        ganador.style.display = "block";
        ganador.innerHTML = `Gano `+ turno.getNombre();
        //setea a las fichas para q no se puedan mover
        for(let i = 0; i < fichasJugador1.length; i++){
            fichasJugador1[i].ponerEnTablero(false);
            fichasJugador2[i].ponerEnTablero(false);
        }
    }
    function reiniciarJuego(){
        console.log("reiniciar")
        //vacia todos los arreglos
        setArreglosDeEspacios([])
        setMatriz([])
        setFichasJugador1([])
        setFichasJugador2([])
        setdropZones([])
        console.log(dropZones)
        cambiarTurno(null)
        setTurno(null)
        clearCanvas();
        cargarTablero();
        drawFigures();
        //detiene el tiempo y despues lo inicia de cero
        iniciarTiempo(false);
        iniciarTiempo(true);
    }
    function clearCanvas(){
        if(ctx){
            ctx.clearRect(0, 0,canvasWidth,canvasHeight);
        }
    }
    //fichas
    //animacion de seleccion en el menu
    function seleccionarFichaJugador2(ficha){
        console.log(ficha.current)
        fichaMenu2.style.scale = "1.0"
        fichaMenu4.style.scale = "1.0"
        fichaMenu6.style.scale = "1.0"
        ficha.current.style.scale = "1.2"
    }
    function seleccionarFichaJugador1(ficha){
        console.log(ficha)
        fichaMenu1.style.scale = "1.0"
        fichaMenu3.style.scale = "1.0"
        fichaMenu5.style.scale = "1.0"
        ficha.current.style.scale = "1.2"
    }
    const setFichaJ1 = (id) => {
        let fichaSeleccionada = null
        if(id.current.id == "ficha1"){fichaSeleccionada = ficha1}
        if(id.current.id == "ficha3"){fichaSeleccionada = ficha3}
        if(id.current.id == "ficha5"){fichaSeleccionada = ficha5}
        if(fichasJugador1.length>1){
            for(let i = 0; i < fichasJugador1.length;i++){
                fichasJugador1[i].setImagen(fichaSeleccionada)
                imgFichaJugador1 = fichaSeleccionada;
            }
            seleccionarFichaJugador1(id);
        }
    }
    const setFichaJ2 = (id) => {
        let fichaSeleccionada = null
        if(id.current.id == "ficha2"){fichaSeleccionada = ficha2}
        if(id.current.id == "ficha4"){fichaSeleccionada = ficha4}
        if(id.current.id == "ficha6"){fichaSeleccionada = ficha6}
        if(fichasJugador2.length>1){
            for(let i = 0; i < fichasJugador2.length;i++){
                fichasJugador2[i].setImagen(fichaSeleccionada)
                imgFichaJugador2 = fichaSeleccionada;
            }
            seleccionarFichaJugador2(id);
        }
    }
    const setCantLinea = (id) => {
        cantEnLinea = id;
        if(id == 4){
            numColumn = 7;
            numFilas = 6;
            TAMESPACIO = 60;
            TAMANIOFICHA = 30;
        }
        if(id == 5){
            numColumn = 8;
            numFilas = 7;
            TAMESPACIO = 50;
            TAMANIOFICHA = 25;
        }
        if(id == 6){
            numColumn = 9;
            numFilas = 8;
            TAMESPACIO = 45;
            TAMANIOFICHA = 22;
        }
        if(id == 7){
            numColumn = 10;
            numFilas = 9;
            TAMESPACIO = 40;
            TAMANIOFICHA = 20;
        }
        reiniciarJuego();
    }
    const handleMouseDown = (event) => {
        //se obtiene la pos del mouse
        let mouseX = event.layerX;
        let mouseY = event.layerY;
        if(turno.getId()==1){
            //reccore todas las fichas del jugador1
            for(let i = fichasJugador1.length-1; i>=0; i--){
                let ficha = fichasJugador1[i];
                //console.log(fichasJugador1)
                //le pregunta a ficha si esta clickeada
                if(ficha.isClicked(mouseX,mouseY)){
                    //setea la ficha actual
                    setFichaActual(ficha)
                    break;
                }
            }
        }
        if(turno.getId() == 2){
            //reccore todas las fichas del jugador1
            for(let i = fichasJugador2.length-1; i>=0; i--){
                let ficha = fichasJugador2[i];
                //le pregunta a ficha si esta clickeada
                if(ficha.isClicked(mouseX,mouseY)){
                    //setea la ficha actual
                    setFichaActual(ficha)
                    break;
                }
            }
        }
    }
    const handleMouseMove = (event) => {
        if(fichaActual!=null){
            //mueve la ficha de lugar y redibuja todo
            fichaActual.move(event.layerX,event.layerY);
            drawFigures();
        }
    }
    const handleMouseLeave = () => {
        //si el mouse sale del canvas devuelve la ficha actual a su pos inicial
        if(fichaActual!=null){
            fichaActual.posInicial();
            setFichaActual(null)
            drawFigures();
        }
    }
    if(ctx){
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
    }
    const setTitulo = (turnoRef) => {
        setTittle(turnoRef.current)
    }
    function cambiarTurno(t){
        //si no hay un turno puesto cambia el turno a jugador 1
        if(t == null){
            console.log("turno es null")
            //ganador.style.display = "none";
            titulo.innerHTML = `Turno de `+jugador1.getNombre();
            setTurno(jugador1)
            titulo.style.display="block";
            titulo.style.color="#791111";
        }
        //si es el turno del jugador 1 lo cambia al 2
        else if(turno.getId() == 1){
            console.log("turno es 1")
            setTurno(jugador2)
            titulo.innerHTML = `Turno de `+jugador2.getNombre();
            titulo.style.color="#296CD1";
        }
        else{
            console.log("turno es 2")
            titulo.innerHTML = `Turno de `+jugador1.getNombre();
            setTurno(jugador1)
            titulo.style.color="#791111";
        }
    }

    function insertarFicha(columna){
        //se reccorre la matriz
        for(let i = matriz.length-1; i >=  0; i--){
            let fila = matriz[i];
            //console.log(matriz)
            //console.log("fila: "+i+" columna: "+columna)
            //si la posicion en la matriz esta libre
            if(!fila[columna].estaOcupada()){
                //se le setea una ficha
                //console.log("fila: "+i+" columna: "+columna)
                fila[columna].setFicha(fichaActual);
                //se calcula la pos para q la ficha entre en el espacio
                let x = (fila[columna].getX() + TAMESPACIO/1.7);
                let y = fila[columna].getY() + TAMESPACIO/1.7;
                //se guarda la ficha actual en otra variable para animarla
                setFichaAnimada(fichaActual)
                setPos(0)
                fichaActual.ponerEnTablero(false);
                mover(x,y);
                drawFigures();
                checkGanador(i,columna);
                break;
            }
            else if(i == 0){
                fichaActual.posInicial();
                drawFigures()
                cambiarTurno()
            }    
        }
    }
    function mover(x,y){
        //comienza un intervalo
        setIntervalo(
            setInterval(() => {
                setPos(+1)
                //mueve la ficha sumandole pos
                fichaAnimada.move(x,fichaAnimada.getY()+pos);
                drawFigures()
                //cuando llega a espacio del casillero
                if(fichaAnimada.getY()>y){
                    fichaAnimada.move(x,y);
                    //termina el intervalo
                    clearInterval(intervalo);
                    if(fichaAnimada.getY()==y && fichaAnimada.getX()==x){
                        revotarFicha(x,y);
                    }
                    drawFigures()
                }
            },10)
        )
    }
    function revotarFicha(x,y){
        let posicion = 0;
        let intervalo2 =  null
        intervalo2 = setInterval(() => {
            //incrementa la pos en Y hasta cierta altura
            if(fichaAnimada.getY()>(y-TAMESPACIO/3)){
                posicion -=0.5;
                fichaAnimada.move(x,(fichaAnimada.getY()+posicion));
                drawFigures()
            }
            else{
                clearInterval(intervalo2);
                drawFigures()
                bajarFicha(x,y);
            }
        },10)
    }
    //mueve la ficha de a poco hacia la posicion
    function bajarFicha(x,y){
        setPos(0)
        setIntervalo(
            setInterval(() => {
                setPos(+0.25)
                fichaAnimada.move(x,fichaAnimada.getY()+pos);
                drawFigures()
                if(fichaAnimada.getY()>y){
                    fichaAnimada.move(x+1,y);
                    clearInterval(intervalo);
                    drawFigures()
                }
            },20)
        )
    }
    //si se cumple alguno de los checkeos termina el juego
    function checkGanador(fila,columna){
        //console.log(checkDiagonales(fila,columna),checkFila(fila,columna),checkColumna(fila,columna));
        if(checkDiagonales(fila,columna) || checkFila(fila,columna) || checkColumna(fila,columna)){
            finalizarJuego();
        }
    }
    function checkDiagonales(fila,columna){
        //llama a las funciones que checkean en las distintas diagonales
        let suma = 0;
        let izqAbajo = checkDiagAbajIzq(suma,fila,columna);
        let izqArriba = checkDiagArribIzq(suma,fila,columna);
        let derAbajo = checkDiagAbajDer(suma,fila,columna);
        let derArriba = checkDiagArribDer(suma,fila,columna);
        if(izqAbajo == 0 || derArriba == 0){
            if((izqAbajo + derArriba) >= cantEnLinea){
                return true;
            }
        }
        if(derAbajo == 0 || izqArriba== 0){
            if((izqArriba+derAbajo) >=cantEnLinea){
                return true;
            }
        }
        //cuando ninguno de los dos es == 0, se le resta 1 en el calculo
        if((((izqAbajo + derArriba)-1) >= cantEnLinea) || (((izqArriba+derAbajo)-1) >=cantEnLinea)){
            return true;
        }
        else{
            return false;
        }
    }
    //llama a la funcion checkAbajo y si resultado es > a la cantidad en Linea retorna true
    function checkColumna(fila,columna){
        let suma = 0;
        let abajo =  checkAbajo(suma,fila,columna);
        if(abajo >= cantEnLinea){
            return true;
        }
        else{
            return false;
        }
    }
    //llama a la funcion checkDerecha y checkIzquierda
    //si alguno de los resultados es == 0 suma los resultados y retorna
    //si en ambos lados hay fichas, a la cuenta se le resta 1
    function checkFila(fila,columna){
        let suma = 0;
        let derecha = checkDerecha(suma,fila,columna);
        let izquierda = checkIzquierda(suma,fila,columna);
        if(derecha == 0 || izquierda==0){
            if((derecha + izquierda) >= cantEnLinea){
                return true;
            }
        }
        if(((derecha + izquierda)-1) >= cantEnLinea){
            return true;
        }
        else{
            return false;
        }
    }
    //obtiene la posicion en la que se inserto la ficha
    //y si el tipo de ficha en ese casillero es == al tipo de ficha del turno actual
    //incrementa suma y se llama recursivamente una fila arriba
    //si el resultado  <= 1 es porq no se encontraron fichas asi que devuelve 0
    function checkAbajo(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(fila<numFilas-1){
                    suma = checkAbajo(suma,fila+1,columna)
                }
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkDerecha(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna<numColumn-1){
                    suma = checkDerecha(suma,fila,columna+1)
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkIzquierda(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna>0){
                    suma=checkIzquierda(suma,fila,columna-1)
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkDiagArribIzq(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna>0 && fila>0){
                    suma = checkDiagArribIzq(suma,fila-1,columna-1);
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkDiagArribDer(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna<numColumn-1 && fila>0){
                    suma = checkDiagArribDer(suma,fila-1,columna+1);
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkDiagAbajIzq(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna>0 && fila<numFilas-1){
                    suma = checkDiagAbajIzq(suma,fila+1,columna-1);
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    function checkDiagAbajDer(suma,fila,columna){
        let filaMatriz = matriz[fila]
        let espacio = filaMatriz[columna]
        let tipoFicha = espacio.getTipoDeFicha();
        if(tipoFicha!=null){
            if(tipoFicha == turno.getId()){
                suma++
                if(columna<numColumn-1 && fila<numFilas-1){
                    suma = checkDiagAbajDer(suma,fila+1,columna+1);
                } 
            }
        }
        if(suma<=1){
            return 0;
        }
        else{
            return suma;
        }
    }
    const initCanvas = (c) => {
        setCanvas(c)
        //console.log(c)
    }
    return (
        <JuegoContext.Provider value={{reiniciarJuego,initCanvas,setNamePlayer1,setNamePlayer2,setFichaJ1,setFichaJ2,setCantLinea,setTitulo,setGanador,setFichas,ponerNombres}}>
            {children}
        </JuegoContext.Provider>
    );
}*/