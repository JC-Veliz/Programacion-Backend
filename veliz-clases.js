// Creamos una clase de tipo Usuario
class Usuario {
    //Definimos Atributos, propiedades
    constructor(nombre, apellido, libros, mascotas)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    // Definimos Metodos, funciones.

    getFullName(){
        //Metodo que retorna el nombre del Usuario
        console.log(`Hola! mi nombre es: ${this.nombre}`);
    }
    
    addMascotas(mascota){
        //Metodo que incorpora un animal al array a travez del parametro mascota
        this.mascotas.push(mascota);
        console.log(`Se agrego la siguiente mascota: ${mascota}`)

    }

    countMascotas(){
        //Metodo que cuenta el largo total del Array y devuelve en numero la cantidad.
       console.log(`Cantidad de mascotas: ${this.mascotas.length}`);
    }

    addBook(nombre, autor)
    {
        //Metodo que incorpora a travez de los parametros nombre y autor
        // valores en una lista. Lista de libros.
        this.libros.push({nombre,autor});        
        console.log(this.libros);
    }

    getBookNames()
    {
        //Metodo que recorre un array y retorna el valor que contiene la propiedad.
        console.log(`Nombre Libros:`) 
        this.libros.forEach(name => {return console.log(name.nombre)});
        
    }
}
// Creamos nuevo Usuario con algunos valores por defecto.
// Nombre, Apellido, Libros: Nombre , Autor, Mascotas.
const JuanCruz = new Usuario(
                            `Juan Cruz`,
                             `Veliz`,
                             [{nombre:"Harry potter y la piedra filosofal", autor:"J. K. Rowling"},{nombre:"Los Ojos del Perro Siberiano", autor:"Antonio Santa Ana"}],
                             ["Perro", "Gato"]
                             );

//Llamamos a los Metodos que pertenecen a la clase Usuario.
JuanCruz.getFullName();
JuanCruz.addMascotas("Tortuga");
JuanCruz.countMascotas();
JuanCruz.addBook("El Principito","Antoine de Saint-Exupéry");
JuanCruz.getBookNames();