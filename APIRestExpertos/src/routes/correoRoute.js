const express = require('express');
const router = express.Router();
const {EnviarCorreo} = require("../configuration/correo");
require('dotenv').config();
const { body, param } = require('express-validator'); 
router.post("/envio", async (req, res) => {
    const { email, descripcion } = req.body;

    try {
        const enviado = await EnviarCorreo({
            from: process.env.correousuario,
            to: email, // <-- aquí el cambio correcto
            subject: "Orden Compra - Ferretería Sistemas",
            html: `
                <p>Su código de verificación es: <b>1234567</b></p>
                <p>Descripción: ${descripcion}</p>
            `
        });

        if (enviado) {
            res.json({ msg: "Correo enviado correctamente" });
        } else {
            res.status(500).json({ msg: "Error al enviar el correo" });
        }
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ msg: "Error interno al intentar enviar el correo" });
    }
});

module.exports = router;