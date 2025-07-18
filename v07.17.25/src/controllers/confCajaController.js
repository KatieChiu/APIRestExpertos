const ConfiguracionCaja = require('../models/confCaja');

// Obtener configuración de la caja 
exports.listar = async (req, res) => {
    try {
        const cCaja = await ConfiguracionCaja.findAll();
        res.json(cCaja);
    } catch (error) {
        console.error("Error al listar las configuraciones de caja diarias:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};
exports.guardar = async (req, res) => {
  try {
    const { fecha, saldo_inicial } = req.body;

    const nuevaConfig = await ConfiguracionCaja.create({
      fecha: fecha ? new Date(fecha) : new Date(),
      saldo_inicial: saldo_inicial || 0
    });

    res.status(201).json({
      mensaje: 'Configuración creada correctamente',
      configuracion: nuevaConfig
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear configuración de caja' });
  }
};

exports.eliminar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log("Errores de validación en eliminar:", errores.array());
        return res.status(400).json(errores.array());
    }

    const { caja_id } = req.body;

    try {
        const configCaja = await ConfiguracionCaja.findByPk(caja_id);
        if (!configCaja) {
            return res.status(404).json({ mensaje: 'Configuracion de Caja no encontrada' });
        }

        await configCaja.destroy();
        res.json({ mensaje: 'Configuracion de Caja eliminada correctamente' });

    } catch (error) {
        console.error("Error al eliminar la Configuracion de Caja:", error);
        return res.status(500).json({ mensaje: 'Error al eliminar la configuracion de Caja' });
    }
};


