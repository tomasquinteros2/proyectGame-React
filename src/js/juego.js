import Jugador from "./Jugador"
import Ficha from "./Ficha"
import EspacioTablero from "./EspacioTablero"
let canvas = null
let ctx = null
let canvasWidth
let canvasHeight
let ganador = null
let ficha1
let ficha2
let ficha3
let ficha4
let ficha5 
let ficha6 
let linea4
let linea5
let linea6
let linea7
export function iniciarCanvas(current,g,t,nom1,nom2,time,ficha1Ref,ficha2Ref,ficha3Ref,ficha4Ref,ficha5Ref,ficha6Ref,linea4Ref,linea5Ref,linea6Ref,linea7Ref){
    canvas = current
    ctx = canvas.getContext("2d")
    canvasWidth=canvas.width;
    canvasHeight=canvas.height;
    ganador = g.current
    titulo = t.current
    nombre1 = nom1.current
    nombre2 = nom2.current
    elementoTiempo = time.current
    ficha1 = ficha1Ref.current
    ficha2 = ficha2Ref.current
    ficha3 = ficha3Ref.current
    ficha4 = ficha4Ref.current
    ficha5 = ficha5Ref.current
    ficha6 = ficha6Ref.current
    ficha1.addEventListener('click',handleClickFicha1)
    ficha2.addEventListener('click',handleClickFicha2)
    ficha3.addEventListener('click',handleClickFicha3)
    ficha4.addEventListener('click',handleClickFicha4)
    ficha5.addEventListener('click',handleClickFicha5)
    ficha6.addEventListener('click',handleClickFicha6)

    linea4 = linea4Ref.current
    linea5 = linea5Ref.current
    linea6 = linea6Ref.current
    linea7 = linea7Ref.current

    linea4.addEventListener("click",handleClickLinea4)
    linea5.addEventListener("click",handleClickLinea5)
    linea6.addEventListener("click",handleClickLinea6)
    linea7.addEventListener("click",handleClickLinea7)

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup",handleMouseUp)
    canvas.addEventListener("mouseleave",handleMouseLeave)
}
    //arreglodeespaciosCHATO
    //se usa para el draw
    let arreglosDeEspacios = []
    //arreglo de columnas
    //se usa para la logica
    let matriz = []
    //arreglos de fichas
    let fichasJugador1 = [];
    let fichasJugador2 = [];
    //arreglo de dropZone
    let dropZones = []
    //por default arranca en 4 la cantidad en linea
    let cantEnLinea = 4;
    let numFilas = 6;
    let numColumn = 7;
    //tamanio de casillero
    let TAMESPACIO = 60;
    //tamanio de la ficha
    let TAMANIOFICHA = 30;
    let alturaTablero = (numFilas*TAMESPACIO);
    let largoTablero = (numColumn*TAMESPACIO);
    let cantidadFichas = numFilas * numColumn;
    //jugadores
    let jugador1 = new Jugador("",1);
    let jugador2 = new Jugador("",2);

    let turno = null;
    //imagenes
    let imgFichaJugador1 = "../img/4Enlinea/juego/ficha1.png";
    let imgFichaJugador2 = "../img/4Enlinea/juego/ficha2.png";
    let imgEspacio = "../img/4Enlinea/juego/espacio.png";
    let imgFicha1 = "../img/4Enlinea/juego/ficha1.png";
    let imgFicha2 = "../img/4Enlinea/juego/ficha2.png";
    let imgFicha3 = "../img/4Enlinea/juego/ficha3.png";
    let imgFicha4 = "../img/4Enlinea/juego/ficha4.png";
    let imgFicha5 = "../img/4Enlinea/juego/ficha5.png";
    let imgFicha6 = "../img/4Enlinea/juego/ficha6.png";
    let dropimg = "../img/4Enlinea/juego/flecha-abajo.png";
    let fondo = "../img/4Enlinea/juego/fondo6.png";
    //fondo
    let imgFondo= new Image();
    imgFondo.src = fondo;
    //se carga el tablero y las fichas
    function cargarTablero(){
        if(ctx){
        //cantidad de fichas para completar el tablero
        cantidadFichas = numFilas * numColumn;
        let posicionTableroX = (canvasWidth/2)-(((numColumn)*TAMESPACIO)/2);
        let posicionTableroY = (canvasHeight/2)-(((TAMESPACIO)*(numFilas))/2);
        let widhtBoard = (numColumn * (TAMESPACIO));
        let heightBoard = (numFilas * (TAMESPACIO));

        //se inicializa el primer espacio en la esquina superior derecha
        let posicionEspacioX = posicionTableroX;
        let posicionEspacioY = posicionTableroY;   
        console.log(posicionTableroX,posicionTableroY)
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
    function addEspacio(locationX,locationY){
        let rect = new EspacioTablero(locationX,locationY,TAMESPACIO,ctx);
        arreglosDeEspacios.push(rect);
        return rect;
    }
    function drawFigures(){
        if(ctx){
            clearCanvas();
            ctx.drawImage(imgFondo,0,0,canvasWidth,canvasHeight)
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
    }
    //obtiene los nombres y si estan vacios los setea como jugador 1 y 2
    export function setNombre1(name){
        jugador1.setNombre(name)
    }
    export function setNombre2(name){
        jugador2.setNombre(name)
    }
    let nombre1
    let nombre2
    function ponerNombres(){
        if(nombre1 == ''){
            nombre1 = "jugador1";
        }
        else if(nombre2 == ''){
            nombre2 = "jugador2";
        }
        else{
            nombre1.innerHTML = jugador1.getNombre();
            nombre2.innerHTML = jugador2.getNombre();
        }

    }
    let cronometro = 0;
    //funcion de cronometro
    let elementoTiempo
    function iniciarTiempo(boolean){
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
                elementoTiempo.innerHTML = `${minutos}:${segundos}`;
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
    export function reiniciarJuego(){
        //vacia todos los arreglos
        arreglosDeEspacios = [];
        matriz = [];
        fichasJugador1 = [];
        fichasJugador2 = [];
        dropZones= [];
        turno = null;
        cambiarTurno()
        clearCanvas();
        cargarTablero();
        drawFigures();
        //detiene el tiempo y despues lo inicia de cero
        iniciarTiempo(false);
        iniciarTiempo(true);
    }
    function clearCanvas(){
        if(ctx)ctx.clearRect(0, 0,canvasWidth,canvasHeight);
    }
    //fichas
    //animacion de seleccion en el menu
    function seleccionarFichaJugador2(ficha){
        ficha2.style.scale = "1.0"
        ficha4.style.scale = "1.0"
        ficha6.style.scale = "1.0"
        ficha.style.scale = "1.2"
    }
    function seleccionarFichaJugador1(ficha){
        ficha1.style.scale = "1.0"
        ficha3.style.scale = "1.0"
        ficha5.style.scale = "1.0"
        ficha.style.scale = "1.2"
    }
    function handleClickFicha1(){
        for(let i = 0; i < fichasJugador1.length;i++){
            fichasJugador1[i].setImagen(imgFicha1)
        }
        imgFichaJugador1 = imgFicha1;
        seleccionarFichaJugador1(ficha1);
    }
    function handleClickFicha2(){
        for(let i = 0; i < fichasJugador2.length;i++){
            fichasJugador2[i].setImagen(imgFicha2)   
        }
        imgFichaJugador2 = imgFicha2;
        seleccionarFichaJugador2(ficha2);
    }
    function handleClickFicha3(){
        console.log("ficha3")
        for(let i = 0; i < fichasJugador1.length;i++){
            fichasJugador1[i].setImagen(imgFicha3)
        }
        imgFichaJugador1 = imgFicha3;
        seleccionarFichaJugador1(ficha3);
    }
    function handleClickFicha4(){
        for(let i = 0; i < fichasJugador2.length;i++){
            fichasJugador2[i].setImagen(imgFicha4)
        }
        imgFichaJugador2 = imgFicha4;
        seleccionarFichaJugador2(ficha4);
    }
    function handleClickFicha5(){
        for(let i = 0; i < fichasJugador1.length;i++){
            fichasJugador1[i].setImagen(imgFicha5)
        }
        imgFichaJugador1 = imgFicha5;
        seleccionarFichaJugador1(ficha5);
    }
    function handleClickFicha6(){
        for(let i = 0; i < fichasJugador2.length;i++){
            fichasJugador2[i].setImagen(imgFicha6)
        }
        imgFichaJugador2 = imgFicha6;
        seleccionarFichaJugador2(ficha6);
    }
    function handleClickLinea4(){
        cantEnLinea = 4;
        numColumn = 7;
        numFilas = 6;
        TAMESPACIO = 60;
        TAMANIOFICHA = 30;
        reiniciarJuego();
    }
    function handleClickLinea5(){
        cantEnLinea = 5;
        numColumn = 8;
        numFilas = 7;
        TAMESPACIO = 50;
        TAMANIOFICHA = 25;
        reiniciarJuego();
    }
    function handleClickLinea6(){
        cantEnLinea = 6;
        numColumn = 9;
        numFilas = 8;
        TAMESPACIO = 45;
        TAMANIOFICHA = 22;
        reiniciarJuego();
    }
    function handleClickLinea7(){
        cantEnLinea = 7;
        numColumn = 10;
        numFilas = 9;
        TAMESPACIO = 40;
        TAMANIOFICHA = 20;
        reiniciarJuego();
    }
    cargarTablero();
    drawFigures();

    let fichaActual=null;
    function handleMouseDown(event){
            //se obtiene la pos del mouse
            console.log("mouse down")
            let mouseX = event.layerX;
            let mouseY = event.layerY;
            console.log(mouseX, mouseY)*/
            console.log(turno)
            if(turno.getId()==1){
                //reccore todas las fichas del jugador1
                for(let i = fichasJugador1.length-1; i>=0; i--){
                    let ficha = fichasJugador1[i];
                    //le pregunta a ficha si esta clickeada
                    if(ficha.isClicked(canvasMouseX,canvasMouseY)){
                        //setea la ficha actual
                        fichaActual = ficha;
                        break;
                    }
                }
            }
            if(turno.getId() == 2){
                //reccore todas las fichas del jugador1
                for(let i = fichasJugador2.length-1; i>=0; i--){
                    let ficha = fichasJugador2[i];
                    //le pregunta a ficha si esta clickeada
                    if(ficha.isClicked(canvasMouseX,canvasMouseY)){
                        //setea la ficha actual
                        fichaActual = ficha;
                        break;
                    }
                }
            }
    }
    function handleMouseMove(event){
            // Obtener las coordenadas del mouse en relación con la ventana del navegador
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            
            // Obtener la posición del canvas en la página
            let canvasRect = event.target.getBoundingClientRect();
            let canvasX = canvasRect.left;
            let canvasY = canvasRect.top;
            
            // Calcular las coordenadas del mouse en relación con el canvas
            let canvasMouseX = mouseX - canvasX;
            let canvasMouseY = mouseY - canvasY;
            //si hay una ficha agarrada
            if(fichaActual!=null){
                //mueve la ficha de lugar y redibuja todo
                fichaActual.move(canvasMouseX,canvasMouseY);
                drawFigures();
            }
    }
    function handleMouseUp(){
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
                    fichaActual = null;
                }
            }
            //si la ficha no estaba en ningun dropzone vuelve a su pos inicial
            if(fichaActual != null){
                fichaActual.posInicial();
                fichaActual = null;
                drawFigures()
            }
        }
    }
    function handleMouseLeave(){
        //si el mouse sale del canvas devuelve la ficha actual a su pos inicial
        if(fichaActual!=null){
            fichaActual.posInicial();
            fichaActual = null;
            drawFigures();
        }
    }
    let titulo 
    function cambiarTurno(){
        if(ganador && titulo){
            //si no hay un turno puesto cambia el turno a jugador 1
        if(turno == null){
            ganador.style.display = "none";
            titulo.innerHTML = `Turno de `+jugador1.getNombre();
            turno = jugador1;
            titulo.style.display="block";
            titulo.style.color="#791111";
        }
        //si es el turno del jugador 1 lo cambia al 2
        else if(turno.getId() == 1){
            turno = jugador2;
            titulo.innerHTML = `Turno de `+jugador2.getNombre();
            titulo.style.color="#296CD1";
        }
        else{
            titulo.innerHTML = `Turno de `+jugador1.getNombre();
            turno = jugador1;
            titulo.style.color="#791111";
        }
        } 
    }
    let pos = 0
    let intervalo=0;
    let fichaAnimada = null;
    function insertarFicha(columna){
        //se reccorre la matriz
        for(let i = matriz.length-1; i >=  0; i--){
            let fila = matriz[i];
            //si la posicion en la matriz esta libre
            if(!fila[columna].estaOcupada()){
                //se le setea una ficha
                fila[columna].setFicha(fichaActual);
                //se calcula la pos para q la ficha entre en el espacio
                let x = (fila[columna].getX() + TAMESPACIO/1.7);
                let y = fila[columna].getY() + TAMESPACIO/1.7;
                //se guarda la ficha actual en otra variable para animarla
                fichaAnimada = fichaActual;
                pos=0;
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
        intervalo = setInterval(() => {
            pos += 1;
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

    }
    function revotarFicha(x,y){
        let posicion = 0;
        let intervalo2 = setInterval(() => {
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
        pos = 0;
        intervalo = setInterval(() => {
            pos += 0.25;
            fichaAnimada.move(x,fichaAnimada.getY()+pos);
            drawFigures()
            if(fichaAnimada.getY()>y){
                fichaAnimada.move(x+1,y);
                clearInterval(intervalo);
                drawFigures()
            }
        },20)
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
