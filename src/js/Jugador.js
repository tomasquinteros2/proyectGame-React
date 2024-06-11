class Jugador{
    constructor(nombre,id){
        this.id = id;
        this.nombre = "jugador "+id;
    }
    getId(){
        return this.id
    }
    setNombre(nombre){
        this.nombre=nombre;
    }
    getNombre(){
        return this.nombre;
    }
}
export default Jugador