const { 
  User_LigaV, User_GameV 
}  = require('../obj_resposta');
const { Users_Pedidos_Ligas, Ligas_has_Users, Users }  = require('../models');
const { Op }          = require('sequelize');

module.exports = {
  async SetaPedido(req, res) {
    // tenho que criar liga_has_users e apagar pedido
    // tbm tenho que devolver o obj UserLiga para adicionar na liga la no usuário
    // -- Cria a relação ligas_has_users
      const relac = await Ligas_has_Users.create({
        Ligas_idLigas   : req.body.pedido.Ligas_idLigas,
        Users_idUsers   : req.body.pedido.Users_idUsers,
        apelido         : req.body.pedido.user_do_pedido.apelido,
        isAdmin         : false,
      });
      console.log("Relação liga_has_users criada", relac);
    // apaga o pedido
      const ped = await Users_Pedidos_Ligas.findOne({where: {id : req.body.pedido.id}});
      if(ped){
        await ped.update({
          aceite : true,
        });
        await ped.save();
        console.log("Pedido Confirmado");
      }
    // retorna o objeto UserLiga para inserir na liga
    if(req.body.bool){
      const us = await Users.findOne({where: { id : req.body.pedido.Users_idUsers}}); 
      let userL = new User_LigaV(us, relac);
      let userG = new User_GameV(us, relac.apelido);
      console.log("UserLiga -> \n",userL);
      return res.send({status: true, msg: "Pedido aceito", userL, userG});
    } else {
      return res.send({status: true, msg: "Pedido recusado"});
    }
      
  }
};