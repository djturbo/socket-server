

# Socket-Server

Instalar los módulos para Node
````
npm install
```

Generar El dist
```
tsc -w
````

Levantar el servidor:
```
nodemon dist/
o
node dist/
```

Si por ejemplo se borrar algún archivo y se quiere recuperar se ejecuta el siguiente comando:
```
git checkout -- .
````

# Seccion 4

En esta sección 4, ya comenzaremos a trabajar con sockets, estos son parte de los temas que cubriremos:


    Configuración de socket.io en nuestro backend

    Implementar el patrón singleton en nuestra clase server

    Conectar Angular con nuestro servidor de sockets

    Detectar conexiones y desconexiones en el backend

    Detectar caídas y reconexiones del lado del cliente (Angular)

    Envío de nuestra primera comunicación por sockets 

    


# Sección 5

En esta sección 5 trabajaremos en los siguientes temas:

Rutas en Angular

Manejo e identificación del ID del socket con un usuario

Manejar usuarios en el backend

Mantener el nombre de usuario en reconexiones

Guards en Angular

Recibir mensajes privados

Enviar mensajes a todos los usuarios conectados mediante un servicio REST.