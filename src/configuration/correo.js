const correo = require('nodemailer');
require('dotenv').config();

const EnviarCorreo = async (datos) =>{
    const transporte = correo.createTransport({
        host: process.env.correoservicio,
        port: 465,
        secure: true,
        auth:{
            user: process.env.correousuario,
            pass: process.env.correocontra,
        }
    });
    const opciones= {
        from: process.env.correousuario,
        to: datos.to,
        subject: datos.subject,
        text: datos.text,
        html: datos.html|| ''
    };
    try {
        const info = await transporte.sendMail(opciones);
        console.log("Correo enviado");
        return true;
    } catch(error) {
        console.error("Error al enviar correo: ", error);
        return false;
    }

};
module.exports = {EnviarCorreo};