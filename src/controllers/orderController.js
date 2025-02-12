const Order = require("../models/OrderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Workshop = require("../models/workshopModel");

// Obtiene los datos de usuarios, productos y workshops para mostrarlos en el front
exports.getOptions = async (req, res) => {
  try {
    const [users, products, workshops] = await Promise.all([
      User.findAll(),
      Product.findAll(),
      Workshop.findAll(),
    ]);

    res.status(200).json({
      users,
      products,
      workshops,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Elimina una orden validando que el ID de la orden exista en la base de datos
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Se obtiene el ID de la orden desde los parámetros

    // Se busca la orden por su ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Se elimina la orden
    await order.destroy();

    res.status(200).json({
      message: "Orden eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

