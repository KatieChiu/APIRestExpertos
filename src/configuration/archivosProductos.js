const multer = require('multer');
const path = require('path');

// Almacenamiento de imágenes de productos
const almacenamientoProductos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/imagenes-productos'));
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const nombreArchivo = `producto-${Date.now()}-${Math.floor(Math.random() * 10000)}${extension}`;
        cb(null, nombreArchivo);
    }
});
 
const uploadImagenProducto = multer({
    storage: almacenamientoProductos,
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

module.exports = { uploadImagenProducto };
