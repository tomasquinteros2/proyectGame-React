import React from 'react'
//import { useCanvas } from "../../js/Juego"
import { useRef,useState,useEffect} from 'react'
import jugador from "../../js/Jugador"
import EspacioTablero from "../../js/EspacioTablero"
import Ficha from "../../js/Ficha"
import { set } from 'mongoose'
export const GamePage = () => {
    const [canvas,setCanvas] = useState()
    const [ctx,setCtx] = useState()

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

    const [titulo,setTittle] = useState()
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
    //tamaño de casillero
    let TAMESPACIO = 60;
    //tamanio de la ficha
    let TAMANIOFICHA = 30;
    const alturaTablero = (numFilas*TAMESPACIO);
    const largoTablero = (numColumn*TAMESPACIO);
    const [canvasWidth, setCanvasWidth] = useState(null)
    const [canvasHeight, setCanvasHeight] = useState(null)
    let cantidadFichas = numFilas * numColumn;
    const [turno, setTurno] = useState(null)
    let fichaActual = null
    //const [fichaActual, setFichaActual] = useState()
    let pos = 0
    //const [pos, setPos] = useState()
    const [intervalo, setIntervalo] = useState()
    const [intervalo2, setIntervalo2] = useState()
    let fichaAnimada = null
    //const [fichaAnimada, setFichaAnimada] = useState()
    const [fichaMenu1, setFichaMenu1] = useState()
    const [fichaMenu2, setFichaMenu2] = useState()
    const [fichaMenu3, setFichaMenu3] = useState()
    const [fichaMenu4, setFichaMenu4] = useState()
    const [fichaMenu5, setFichaMenu5] = useState()
    const [fichaMenu6, setFichaMenu6] = useState()
    //jugadores
    let jugador1 = new jugador("",1)
    let jugador2 = new jugador("",2)
    const ganadorRef = useRef(null)
    const turnoRef = useRef(null)
    const fichaSeleccion1 = useRef(null)
    const fichaSeleccion2 = useRef(null)
    const fichaSeleccion3 = useRef(null)
    const fichaSeleccion4 = useRef(null)
    const fichaSeleccion5 = useRef(null)
    const fichaSeleccion6 = useRef(null)
    const nombre1 = useRef(null)
    const nombre2 = useRef(null)
    //useEffects
    useEffect(() => {
        if(canvas){
            setCtx(canvas.getContext("2d"))
            setCanvasHeight(canvas.height)
            setCanvasWidth(canvas.width)
            cambiarTurno()
        }
    },[canvas])
    useEffect(() => {
        // Tu lógica actual aquí
        if (canvas) {
            canvas.addEventListener("mouseup", handleMouseUp)
            canvas.addEventListener("mousedown", handleMouseDown)
            canvas.addEventListener("mousemove", handleMouseMove)
            canvas.addEventListener("mouseleave", handleMouseLeave)
        }
        
        // Limpieza del efecto
        return () => {
            if (canvas) {
                //console.log("effect",turno)
                canvas.removeEventListener("mouseup", handleMouseUp)
                canvas.removeEventListener("mousedown", handleMouseDown)
                canvas.removeEventListener("mousemove", handleMouseMove)
                canvas.removeEventListener("mouseleave", handleMouseLeave)
            }
        };
    }, [ctx, turno]);
    useEffect(() => {
        console.log("renderizado")
    })
    /*useEffect(() => {
        if (arreglosDeEspacios.length === 0 && matriz.length === 0 && fichasJugador1.length === 0 && fichasJugador2.length === 0 && dropZones.length === 0) {
            console.log("Se vaciaron los arreglos");
            cargarTablero();
            drawFigures();
            cambiarTurno()
            //detiene el tiempo y despues lo inicia de cero
            iniciarTiempo(false);
            iniciarTiempo(true);
        }
    }, [arreglosDeEspacios, matriz, fichasJugador1, fichasJugador2, dropZones]);*/
    //menu
    const menuGame = ()=>{
        //restartGame;
        document.querySelector('.canvas-form').style.display="flex";
        document.querySelector('.canvas').style.display="none";
    } 
    //reiniciarJuego
    const reiniciarJuego = () => {
        console.log("reiniciar");
    
        // Vaciar todos los arreglos
        setArreglosDeEspacios([]);
        setMatriz([]);
        setFichasJugador1([]);
        setFichasJugador2([]);
        setdropZones([]);
    
        // Limpiar el canvas
        clearCanvas();
    
        // Cargar el tablero y dibujar las fichas nuevas
        cargarTablero();
        drawFigures();
    
        // Cambiar el turno y reiniciar el tiempo si es necesario
        cambiarTurno();
        iniciarTiempo(false);
        iniciarTiempo(true);
    }
    function drawFigures(){
        //clearCanvas();
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
    const cargarTablero = () => {
        console.log("cargarTablero")
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
    const addEspacio = (locationX,locationY) => {
        let rect = new EspacioTablero(locationX,locationY,TAMESPACIO,ctx);
        arreglosDeEspacios.push(rect);
        return rect;
    }
    function clearCanvas(){
        if(ctx){
            ctx.clearRect(0, 0,canvasWidth,canvasHeight);
            console.log("clear",canvasHeight,canvasWidth)
        }
    }
    function cambiarTurno(){
        //si no hay un turno puesto cambia el turno a jugador 1
        if(turno == null){
            console.log("turno es null")
            //ganador.style.display = "none";
            turnoRef.current.innerHTML = `Turno de `+jugador1.getNombre();
            setTurno(jugador1)
            turnoRef.current.style.display="block";
            turnoRef.current.style.color="#791111";
        }
        //si es el turno del jugador 1 lo cambia al 2
        else if(turno.getId() == 1){
            console.log("turno es 2")
            setTurno(jugador2)
            turnoRef.current.innerHTML = `Turno de `+jugador2.getNombre();
            turnoRef.current.style.color="#296CD1";
        }
        else{
            console.log("turno es 1")
            turnoRef.current.innerHTML = `Turno de `+jugador1.getNombre();
            setTurno(jugador1)
            turnoRef.current.style.color="#791111";
        }
    }
    const handleMouseDown = (event) => {
        //se obtiene la pos del mouse
        let mouseX = event.layerX;
        let mouseY = event.layerY;
        if(turno.getId()==1){
            //reccore todas las fichas del jugador1
            //console.log(fichasJugador1)
            for(let i = fichasJugador1.length-1; i>=0; i--){
                let ficha = fichasJugador1[i];
                //console.log(fichasJugador1)
                //le pregunta a ficha si esta clickeada
                if(ficha.isClicked(mouseX,mouseY)){
                    //setea la ficha actual
                    //setFichaActual(ficha)
                    fichaActual= ficha
                    break;
                }
            }
        }
        if(turno.getId() == 2){
            //reccore todas las fichas del jugador1
            //console.log(fichasJugador2)
            for(let i = fichasJugador2.length-1; i>=0; i--){
                let ficha = fichasJugador2[i];
                //le pregunta a ficha si esta clickeada
                if(ficha.isClicked(mouseX,mouseY)){
                    //setea la ficha actual
                    //setFichaActual(ficha)
                    fichaActual= ficha
                    break;
                }
            }
        }
    }
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
                    //console.log(dropZones)
                    insertarFicha(i);
                    cambiarTurno();
                    //setFichaActual(null)
                    fichaActual = null
                   // console.log("fichaActual3"+fichaActual)
                }
            }
            //si la ficha no estaba en ningun dropzone vuelve a su pos inicial
            if(fichaActual != null){
                fichaActual.posInicial();
                //setFichaActual(null)
                fichaActual = null
                drawFigures()
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
            //setFichaActual(null)
            fichaActual = null
            drawFigures();
        }
    }
    //nombre de los jugadores
    /*const namePlayer1 = (event)=>{
        const titulo1 = document.querySelector("#titulo1")
        setNamePlayer1(event.target.value,titulo1)
    };*/
    /*const namePlayer2 = (event)=>{
        const titulo2 = document.querySelector("#titulo2")
        setNamePlayer2(event.target.value,titulo2)
    };
    const clickFichaJ1 = (id) => {
        setFichaJ1(id)
    }
    const clickFichaJ2 = (id) => {
        setFichaJ2(id)
    }
    const clickCantLinea = (id) => {
        setCantLinea(id)
    }*/
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
    function insertarFicha(columna){
        //se reccorre la matriz
        for(let i = matriz.length-1; i >=  0; i--){
            let fila = matriz[i];
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
                //setFichaAnimada(fichaActual)
                fichaAnimada = fichaActual
                //setPos(0)
                pos = 0
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
                pos +=1
                //setPos(+1)
                //mueve la ficha sumandole pos
                fichaAnimada.move(x,fichaAnimada.getY()+pos);
                drawFigures()
                //cuando llega a espacio del casillero
                if(fichaAnimada.getY()>y){
                    fichaAnimada.move(x,y);
                    //termina el intervalo
                    clearInterval(intervalo);
                    if(fichaAnimada.getY()==y && fichaAnimada.getX()==x){
                        //revotarFicha(x,y);
                    }
                    drawFigures()
                }
            },10)
        )
    }
    function revotarFicha(x,y){
        let posicion = 0;
        setIntervalo2(
            setInterval(() => {
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
                console.log("holu")
            },10)
        )
    }
    //mueve la ficha de a poco hacia la posicion
    function bajarFicha(x,y){
        pos = 0
        //setPos(0)
        setIntervalo(
            setInterval(() => {
                pos += 0.25
                //setPos(+0.25)
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
    const [cronometro, setCronometro] = useState(0)

    //funcion de cronometro
    function iniciarTiempo(boolean){
        let element = document.getElementById("tiempo");
        //setea la cantidad de minutos
        let cantminutos = 3;
        //se pasa a segundos
        let tiempo = cantminutos * 60;
        //si se recibio un true
        if(boolean){
            setCronometro(
                setInterval(()=>{
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
                }, 1000)
            )
        }
        else{
            //si se recibe un false termina el intervalo
            clearInterval(cronometro);
        }
    }
    function finalizarJuegoEmpate(){
        //frena el tiempo
        iniciarTiempo(false);
        turnoRef.current.style.display ="none";
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
        //console.log(turnoRef)
        turnoRef.current.style.display ="none";
        ganador.style.display = "block";
        ganador.innerHTML = `Gano `+ turno.getNombre();
        //setea a las fichas para q no se puedan mover
        for(let i = 0; i < fichasJugador1.length; i++){
            fichasJugador1[i].ponerEnTablero(false);
            fichasJugador2[i].ponerEnTablero(false);
        }
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
    //juegar 4 en linea
    //segundo play
    const playCanvas = ()=>{
        document.querySelector('.canvas').style.display="flex";
        document.querySelector('.canvas-form').style.display="none";
        //reiniciarJuego()
        setTurno(jugador1)
        clearCanvas();
        cargarTablero();
        drawFigures();
        iniciarTiempo(false);
        iniciarTiempo(true);
    }
    //primero play
    const playGame = () => {
            document.querySelector('.section-image').style.display="none";
            document.querySelector('.canvas-form').style.display="flex";
            //setFichas(ficha1,ficha2,ficha3,ficha4,ficha5,ficha6)
            setCanvas(document.querySelector("#canvas"))
            ponerNombres(nombre1.current,nombre2.current)
        }
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
                            //onChange={namePlayer1}
                        />
                        <div className="token" id="ficha1" onClick={() => clickFichaJ1(ficha1)} ref={fichaSeleccion1}>
                            <img src="../img/4Enlinea/juego/ficha1.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha3" onClick={() => clickFichaJ1(ficha3)} ref={fichaSeleccion3}>
                            <img src="../img/4Enlinea/juego/ficha3.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha5" onClick={() => clickFichaJ1(ficha5)} ref={fichaSeleccion5}>
                            <img src="../img/4Enlinea/juego/ficha5.png" alt="ficha1" width="80px"/>
                        </div>
                    </div>
                    <div className="player">
                    <input 
                        type="text"
                        className="inputCanvas"
                        id="namePlayer2"
                        placeholder="jugador 2"
                        //onChange={namePlayer2}
                    />
                        <div className="token" id="ficha2" onClick={() => clickFichaJ2(ficha2)} ref={fichaSeleccion2}>
                            <img src="../img/4Enlinea/juego/ficha2.png" alt="ficha2" width="80px"/>
                        </div>
                        <div className="token" id="ficha4" onClick={() => clickFichaJ2(ficha4)} ref={fichaSeleccion4}>
                            <img src="../img/4Enlinea/juego/ficha4.png" alt="ficha1" width="80px"/>
                        </div>
                        <div className="token" id="ficha6" onClick={() => clickFichaJ2(ficha6)} ref={fichaSeleccion6}>
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
                    <div id="linea4" onClick={() => clickCantLinea(4)}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-4-inline.png" alt=""/>
                    </div>
                    <div id="linea5" onClick={() => clickCantLinea(5)}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-5-inline.png" alt=""/>
                    </div>
                    <div id="linea6" onClick={() => clickCantLinea(6)}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-6-inline.png" alt=""/>
                    </div>
                    <div id="linea7" onClick={() => clickCantLinea(7)}>
                        <img className="btn-x-inLine" src="../img/4Enlinea/juego/btn-7-inline.png" alt=""/>
                    </div>
                </section>
                <div className="titles-canvas">
                    <h1 className="namePlayer1" id="titulo1" ref={nombre1}></h1>
                    <h1 className="namePlayer2" id="titulo2" ref={nombre2}></h1>
                </div>
                <h1 id="turno" ref={turnoRef}></h1>
                <h1 id="ganador" ref={ganadorRef}></h1>
                <canvas id="canvas" width="1140" height="543"></canvas>

                <p id="tiempo"></p>
                <div className="menusGame">
                    <a id="restartGame" onClick={reiniciarJuego}>Reiniciar</a>
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
                        <img src="../img/icons/Boton-like-1.png" alt=""/>
                       </div>
                       <div className="item">
                        <img src="../img/icons/Boton-dislike.png" alt=""/>
                       </div>
                       <div className="line-vertical"></div>
                       <div className="item">
                            <img src="../img/icons/Boton-favoritos.png" alt=""/>
                       </div>
                       <div className="item">
                        <img src="../img/icons/Boton-Compartir.png" alt=""/>
                       </div>
                       <div className="item">
                        <img src="../img/icons/full-screen.png" alt=""/>
                       </div>
                    </div>
                </section>    
            </div>      
        </section>    
        <section className="carousel">
            <button className="button-left">
                <img src="../img/buttons/FLECHITA2.png" alt=""/>
            </button>
            <ul className="slide">
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/fotoCarrousel1.png" alt="galery-photo"/>
                    </div>         
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/Rectangle 47.png" alt="galery-photo"/>
                    </div>
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/fotoCarrousel2.png" alt="galery-photo"/>
                    </div>
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/video3.png" alt="galery-photo"/>
                    </div>
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/video4.png" alt="galery-photo"/>
                    </div>
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/video1.png" alt="galery-photo"/>
                    </div>
                </li>
                <li className="game-item">
                    <div className="photo-container">
                        <img className="game-photo" src="../img/4Enlinea/video2.png" alt="galery-photo"/>
                    </div>
                </li>
            </ul>
            <button className="button-right">
                <img src="../img/buttons/FLECHITA.png" alt="button-right"/>
            </button>
            <div className="pag-slide"></div>
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
                <p>-Click izquierdo en la parte superior del tablero = Para colocar ficha</p>
            </article>
            <article>
                <img src="../img/4Enlinea/tableroarmado.png" alt="instructions-image"/>
            </article>   
        </section>
        <h2>Comentarios</h2>
        <section className="form-container">
            <div className="user-content">
                <img src="../img/icons/claroquesi.png" alt="user-image"/>
                <span>Tú</span>
            </div>
            <div className="form-comment">
                <input type="text" placeholder="¿Que te parecio el juego?"/>
                <button className="button">Enviar</button>
            </div>
        </section>
        <h3>Últimos comentarios</h3>
        <section className="comments">
            <ul className="comment-list">
                <li className="comment">
                    <div className="top-content">
                        <div className="user-content">
                            <img src="../img/icons/leomessi.jpg" alt="user-image"/>
                            <span>Leo Messi</span>
                        </div>
                        <div className="like-comment">
                            <p>1 me gusta</p>
                            <a href="#"></a>
                        </div>
                    </div>
                    <div className="line-center"></div>
                    <div className="bottom-content">
                        <span>eh un buen jueguito</span>
                        <span className="date-comment">18/12/2023</span>
                    </div>
                </li>
            </ul>
        </section>
    </div>
  )
}