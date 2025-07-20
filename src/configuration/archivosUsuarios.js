const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Carpeta temporal para imágenes
const tempDir = path.join(__dirname, '../uploads/temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Almacenamiento temporal para Multer
const almacenamientoUsuarios = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const nombreArchivo = `usuario-temp-${Date.now()}-${Math.floor(Math.random() * 10000)}${extension}`;
        cb(null, nombreArchivo);
    }
});

const uploadImagenUsuario = multer({
    storage: almacenamientoUsuarios,
    fileFilter: (req, file, cb) => {
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PNG, JPG o JPEG'));
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});

module.exports = { uploadImagenUsuario };
