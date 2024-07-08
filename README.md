# desafio-tcit2

Para este proyecto se intento utilizar .NET Framework 4.8 como indicado en el pdf del desafio, pero no se pudo superar el siguiente problema:

System.Data.Entity.Core.ProviderIncompatibleException: 'An error occurred accessing the database. This usually means that the connection to the database failed. Check that the connection string is correct and that the appropriate DbContext constructor is being used to specify it or find it in the application's config file. See http://go.microsoft.com/fwlink/?LinkId=386386 for information on DbContext and connections. See the inner exception for details of the failure.'

Asociado al DbProviderFactories en el archivo Web.config.

Por esto se cambió el framework y fue desarrollado con .NET 6 para el backend y React para el frontend.

## Backend

### Tecnologías utilizadas
- Framework: .NET 6
- URL: https://localhost:7143/

## Frontend

### Tecnologías utilizadas
- Node : v16.18.101
- React : v18.3.3
- URL: https://localhost:3000/

## Base de Datos

### Tecnología utilizada
- Base de Datos: PostgreSQL
- Alojamiento: Aiven
- URL: https://console.aiven.io
