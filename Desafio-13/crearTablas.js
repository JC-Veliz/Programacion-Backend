/*
--CREAR UN SCHEMA LLAMADO mibase

-----CREAR TABLA EN MARIADB: mibase
create table productos(
	titulo VARCHAR(50),
	descripcion VARCHAR(50),
	codigo INT,
	precio FLOAT,
	foto VARCHAR(50),
	stock INT,
	id INT not null unique auto_increment primary key
);

----INSERTAR DATOS EN LA TABLA PRODUCTOS
insert into 
	productos(titulo, descripcion, codigo, precio, foto, stock)
	values 		
		("Lapiz", "Color Azul", 1, 20, "ImagenLapiz", 10),
		("Regla", "Plastico, Roja", 2, 40, "ImagenRegla", 10),
		("Cartuchera", "De tela, Color Negra", 3, 200, "ImagenCartuchera", 10);
		



----CREAR TABLA EN SQLITE3
await mensajes.crearTablaMensajes()
    .then(()=>{

           
        const historial = [
            {nombre: "Juan-Cruz@gmail.com", fyh: "28/11/2022, 0:39:37", mensaje: "Hola!"},
            {nombre: "PedroP9@gmail.com", fyh: "28/11/2022, 0:40:37",mensaje: "Hola,como estas?!"}
            ]      
                
        return mensajes.insertarMensajes(historial)

            
})
*/