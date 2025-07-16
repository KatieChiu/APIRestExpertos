# API REST - Sistema de Gestión de Ventas y Compras

##  Propuesta de Proyecto 1 – Sistemas Expertos (IS912)

**Universidad Nacional Autónoma de Honduras – UNAH-CURC**  
**Entrega:** 16 de julio de 2025

---

##  Descripción General

Esta API RESTful permite gestionar entidades clave de un sistema de ventas y compras como usuarios, productos, proveedores, clientes, ventas, órdenes de compra, y configuraciones de caja. Está diseñada para integrarse fácilmente con interfaces front-end modernas o sistemas expertos de soporte a decisiones.

---

##  Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución del servidor.
- **Express.js** – Framework para la creación de la API.
- **MySQL2** – Sistema de base de datos relacional.
- **Sequelize** – ORM para gestionar modelos y relaciones SQL.
- **argon2** – Algoritmo de cifrado para contraseñas.
- **JWT + Cookies** – Para manejo seguro de sesiones.
- **express-validator** – Validación de entradas del usuario.
- **nodemailer** – Envío de correos ante intentos inválidos de acceso.
- **morgan** – Middleware de logging HTTP.
- **dotenv** – Manejo seguro de variables de entorno.
- **Swagger** – Documentación interactiva de la API.

---

##  Estructura del Proyecto

    /src
    ├── configuraciones/
    │ ├── db.js # Conexión a MySQL
    │ ├── correo.js # Configuración de correo SMTP
    │ └── swagger.js # Configuración Swagger
    ├── controllers/ # Lógica de negocio (MVC)
    ├── middlewares/ # Verificación JWT, validaciones, roles
    ├── models/ # Definición de entidades y relaciones Sequelize
    ├── routers/ # Definición de rutas por entidad
    ├── utils/ # Funciones auxiliares (ej: hash, JWT)
    ├── validators/ # Reglas express-validator
    ├── app.js # Configuración general de la app
    └── server.js # Punto de entrada principal


---

## Funcionalidades en esta versioon: 

- Registro y login de usuarios con contraseñas encriptadas.
- Manejo de sesiones seguras mediante JWT en cookies.
- CRUD completo para productos, proveedores, clientes y ventas.
- Documentación en Swagger para facilitar pruebas desde el navegador.
- Relaciones entre usuarios y sus ventas/órdenes de compra.
- Envío automático de alertas por correo ante fallos de login.

---

##  Próximas mejoras (segunda entrega)

- Integración completa del stack MERN (React + Express + Node + **MySQL**).
- Componentes front-end en React consumiendo esta API.
- Dashboards, reportes inteligentes y validación visual en tiempo real.
- Seguridad reforzada con control de acceso por roles.

---

##  Docente

**Ing. Carlos Flores**

---

## Estudiantes

- Katie Lai Yin Chiu Vásquez – *20211920057*
- Lizzy Pamela Mejía Mejia – *20211900256*
- Axel Jafet Santos Flores – *20201900323*
- Erick David Blanco Santos – *20221900148*
- Jackyr Antonio Discua Calix – *20191900209*

---

## Instalación rápida

```bash
npm install
npm run dev
