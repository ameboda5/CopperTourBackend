<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# indice

## Stack Usado
nest.js: 10.3
###

### Configuraciones necesarias para levantar el proyecto
- instalador de paqueteria utilizando yarn : npm i yarn
- configuracion de docker compose : instalar docker compose y descargar la imagen con docker pull mongo 
- conexion a Bases de datos utilizando mongodb utilizando monggose


## Autenticacion y Registro
### Dependencias necesarias 

 bcryptjs | @nestjs/jwt | @nestjs/mongoose mongoose

 + se hace la configuracion en el dto de user para crear la entidad que llevara nuestra base de datos ( esta es la que me permite conectar con otras capas de datos)
 + se hace la definicion de la entidades en nuestro archivo entities para la definicion en la base de  datos 

### Implemetacion de Jwt 
+ JSON Web Token (JWT) es una herramienta poderosa para la autenticación y autorización en aplicaciones web. En proyectos con Nest.js, JWT se utiliza principalmente para:

1. Autenticación de Usuarios
2. Autorización

+  npm install @nestjs/jwt  |

Autenticación de Usuarios

## Definicion de roles de usuario 
En una empresa de turismo, los roles pueden variar dependiendo del tamaño y el enfoque de la empresa. Aquí hay algunos roles comunes que podrías considerar:

+ CLIENT: Clientes que utilizan los servicios de la empresa.
+ COMPANIEIS : Empresas que utilizan los servicios de la empresa. 
+ TRAVEL_AGENT: Agentes de viajes que ayudan a los clientes a planificar y reservar sus viajes.
+ TOUR_GUIDE: Guías turísticos que acompañan y proporcionan información a los turistas durante sus viajes.
+ SALES_REPRESENTATIVE: Representantes de ventas que promueven y venden paquetes turísticos.
+ CUSTOMER_SERVICE_REPRESENTATIVE: Representantes de servicio al cliente que ayudan a los clientes con sus consultas y problemas.
+ MARKETING_SPECIALIST: Especialistas en marketing que se encargan de las estrategias de promoción y publicidad.
+ ACCOUNTANT: Contadores que gestionan las finanzas y la contabilidad de la empresa.
+ PROGRAMMER: Desarrolladores de software que mantienen y desarrollan las plataformas tecnológicas de la empresa.
+ OPERATIONS_MANAGER: Gerentes de operaciones que supervisan las operaciones diarias de la empresa.
+ HR_MANAGER: Gerentes de recursos humanos que se encargan de la contratación y gestión del personal.
+ ADMINISTRATIVE_ASSISTANT: Asistentes administrativos que apoyan en tareas administrativas generales.
+ LOGISTICS_COORDINATOR: Coordinadores de logística que gestionan el transporte y la organización de los viajes.

