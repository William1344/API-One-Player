const {Users, Ligas_has_Users} = require('../models');
const User_LigaV = require('../obj_resposta/User_LigaV');
const User_GameV = require('../obj_resposta/User_GameV');

module.exports = {
  async SalvarInfosUser(req, res) {
    const userM = await Users.findOne({where: {id: req.body.id_user}});
    if(userM){
      await userM.update({
        num_camisa  : req.body.num_camisa,
        peso        : req.body.peso,
        altura      : req.body.altura,
        envergadura : req.body.envergadura,
        posicao     : req.body.posicao,
      });
      await userM.save();
      return res.send({status: true});
    } else return res.send({status: false, dado: "Erro ao salvar dados do usuário"});
  }
}