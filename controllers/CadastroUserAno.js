const {Users, Ligas_has_Users} = require('../models');
const User_LigaV = require('../obj_resposta/User_LigaV');
const User_GameV = require('../obj_resposta/User_GameV');

module.exports = {
  async CadastroUserAno(req, res) {
    
    const user = await Users.create({
      nome            : "Usuário Anonimo",
      email           : "Definir",
      password        : "",
      isUser_Anonimo  : true,
    });
    
    const lhu = await Ligas_has_Users.create({
      Users_idUsers   : user.id,
      Ligas_idLigas   : req.body.idLiga,
      apelido         : req.body.apelido,
    });

    if(user && lhu){
      let user_liga = new User_LigaV(user, lhu);
      let user_game = new User_GameV(user, lhu.apelido);

      return res.send({userL : user_liga, userG : user_game, codigo : user.id, status : true});

    } else {
      return res.send({dado: "Tivemos problemas para inserir um novo usuário, tente mais tarde",status : false});
    }

  }
};