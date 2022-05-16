const { Ligas, Ligas_has_Users }        = require('../models');
const {LigaV, User_LigaV, User_GameV }  = require('../obj_resposta');

module.exports = {
  async CadastroLiga(req, res) {
    // cadastra uma nova liga
    const [liga, created] = await Ligas.findOrCreate({
      where : {nome : req.body.nome},
      defaults : {
        nome    : req.body.nome,
        criador : req.body.criador.nome,
        local   : req.body.local,
      }
    });

    if(created){
      // cria a relação entre o usuário e a liga criada
      const lhu = await Ligas_has_Users.create({
        Ligas_idLigas : liga.id,
        Users_idUsers : req.body.criador.id,
        apelido       : req.body.apelido,
        isAdmin       : true,
      });
      // criar um obj Liga -> user_liga -> user_game
      let lg = new LigaV(liga);
      let userL = new User_LigaV(req.body.criador, lhu);
      let userG = new User_GameV(req.body.criador, lhu.apelido);
      return res.send({dado : lg, status : true, userL, userG});
    } else return res.send({dado : "Já existe uma liga com este nome!", status : false});
  }
};
