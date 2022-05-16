const { 
  Users_Pedidos_Ligas, Ligas 
}  = require('../models');
const PedidosV        = require('../obj_resposta/PedidosV');
const { Op }          = require('sequelize');

module.exports = {
  async RealizaPedido(req, res) {
    // verifica se o apelido ja existe na liga solicitada
    const liga = await Ligas.findOne({
      where: {id : req.body.idLiga},
      include: [
        {association : "users_da_liga"},
      ]
    });
    console.log("Liga encontrada -> \n", liga);
    
    let valida = true;
    for(let userL of liga.users_da_liga){
      if(userL.Ligas_has_Users.apelido == req.body.apelido){
        valida = false;
        break;
      }
    }
    if(valida){
      // cria o pedido
      const [pedido, created] = await Users_Pedidos_Ligas.findOrCreate({
        where : {[Op.and] : [{Users_idUsers : req.body.idUser}, {Ligas_idLigas : req.body.idLiga}]},
        defaults : {
          Users_idUsers : req.body.idUser,
          Ligas_idLigas : req.body.idLiga,
          apelido       : req.body.apelido,
        }
      });
      console.log("Pedido criado -> \n", pedido);
      // retorna o pedido
      if(created){
        const liga = await Ligas.findOne({
          where: {id : req.body.idLiga},
          include: [
            {association : "users_da_liga"},
          ]
        });
        let pe = {
          pedid     :   true,
          id        :   pedido.id,
          nome      :   liga.nome,
          img_log   :   liga.img_liga,
          local     :   liga.local,
          createdAt :   liga.createdAt,
          membros   :   liga.users_da_liga.length,
        }
        return res.send({
          status  :   true,
          dado    :   pe,
        });
      }
    }else return res.send({ status : false , dado : "O apelido já existe na liga, escolha outro!" });

    //  Verificar se o usuário já está na liga
    /*const [pedido, created] = await PedidosLigas.findOrCreate({
      where : {[Op.and] : [{Users_idUsers : req.body.idUser}, {Ligas_idLigas : req.body.idLiga}]},
      defaults : {
        Users_idUsers : req.body.idUser,
        Ligas_idLigas : req.body.idLiga,
      }
    });

    if(created) return res.send({dado : "Pedido realizado com sucesso!", status : true});
    else        return res.send({dado : "Aguarde o administrador aceitar o seu pedido!", status : false});
    */
  }
};