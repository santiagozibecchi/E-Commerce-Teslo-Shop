# Teslo Shop

## Tecnologías:

-  Typescript
-  MUI
-  Docker
-  Next

## Para crear el proyecto

```
yarn install ó npm install
```

```
npm run dev - para correr el servidor
```

## Levantar base de datos con imagen de docker

### Crear el siguiente archivo

-  docker-compose.yaml con su respectiva informacion

```
docker-compose up -d
```

### Configurar variables de entorno

-  MongoDB URL Local (.env):
   `MONGO_URL=mongodb://localhost:27017/teslodb`

-  Renombrar nombre de la variable de entorno en .env.template

-  Reconstruir los modulos de node y levantar Next.

-  Llenar a base de datos con informacion de pruebas
-  Llamar: http://localhost:3000/api/seed

## Consideraciones al construir la página web

-  El componente que se encarga de mostrar un producto especifico se construye con el metodo estatico para obtener un mejor rendimiento y se revalidaran por dia, se tendra en consideracion que las tallas puede ser un elemento que cambie constantemente ya que el stock varia segun la demanda de compra. En tal caso se realiza un peticion HTTP para evaluar cual es la cantidad en ese momento.

-  Las busquedas se realizan por tags o por slug. Se crea un indice para conectar dos campos que nos ayude a hacer las busquedas. [q].ts q: query

-  Autenticación: admin como api tendran su propia autenticacion. Admin se implementaran ciertos middlewares para que la persona tenga que estar autenticada. Cuando un usuario se crea una cuenta con una red social quiero que tambien se transforme en un usuario de mi base de datos. revalidacion del token cada vez que el usuario cambia de pantalla. Condicional sobre cliente/administrador.

-  Next Auth

-  React Hook Form

-  Flujo para los sistemas de gestión de pagos

## SSP

Como estamos del lado del servidor tambien podemos acceder a las cookies. Podriamos utilizarlas para regresar algo de interes.
