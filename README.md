# Teslo-Shop

-  tecnologías:

*  Typescript
*  MUI
*  Docker
*  Next

## Para crear el proyecto

```
yarn install ó npm install
```

```
npm run dev para correr el servidor
```

## Levantar base de datos con imagen de docker

### Crear el siguiente archivo

-  docker-compose.yaml

```
docker-compose up -d
```

### Configurar variables de entorno

-MongoDB URL Local (IDEM):
`MONGO_URL=mongodb://localhost:27017/entriesdb`

-  Reconstruir los modulos de node y levantar Next yarn install yarn dev

Renombrar el archivo .env.template a .env

-  Llenar a base de datos con informacion de pruebas
-  Llamar: http://localhost:3000/api/seed
