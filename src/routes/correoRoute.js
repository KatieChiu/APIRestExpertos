const express = require('express');
const router = express.Router();
const {EnviarCorreo} = require("../configuration/correo");
require('dotenv').config();
const { body, param } = require('express-validator'); 
<<<<<<< Updated upstream

/**
 * @swagger
 * tags:
 *   - name: Correo
 *     description: Operaciones relacionadas con el envío de correos electrónicos
 */

/**
 * @swagger
 * /correo/envio:
 *   post:
 *     summary: Envía un correo electrónico con información de orden de compra
 *     tags: [Correo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - descripcion
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del destinatario
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la orden de compra
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Correo enviado correctamente"
 *       500:
 *         description: Error al enviar el correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Error al enviar el correo"
 */

=======
>>>>>>> Stashed changes
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