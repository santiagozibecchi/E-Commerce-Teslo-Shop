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
