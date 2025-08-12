const { Usuario, Venta, OrdenCompra } = require("../models");



const obtenerHistorialUsuario = async (req, res) => {
  try {
    const { id } = req.params;


    // Usuario desde Mongo
    const usuario = await Usuario.findById(id).populate("persona_id").select("-password");
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Ventas desde MySQL
    const ventas = await Venta.findAll({ where: { usuario_id: id } });


    // Compras desde MySQL
    const compras = await OrdenCompra.findAll({ where: { usuario_id: id } });

    return res.status(200).json({
      success: true,
      data: {
        usuario,
        ventas,
        compras,
      },
    });
  } catch (error) {
    console.error("Error en historial de usuario:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener historial del usuario",
      error: error.message,
    });
  }
};

