const { 
  Users_Pedidos_Ligas, Ligas 
}  = require('../models');
const PedidosV        = require('../obj_resposta/PedidosV');
const { Op }          = require('sequelize');

module.exports = {
  async CancelaPedido(req, res) {
    // deleta o pedido referente ao id passado
    const pedido = await Users_Pedidos_Ligas.destroy({where: {id: req.body.idPedido}});
    console.log("Oque aconteceu? -> ",pedido);
    if(pedido > 0){
      return res.send({
        status  :   true,
        dado    :   "Pedido deletado com sucesso!",
      });
    } else 
        return res.send({ status : false , dado : "Erro ao deletar pedido!" });
  }
};