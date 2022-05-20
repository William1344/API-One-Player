const { 
  Users, Users_Game, Ligas, Ligas_has_Users, Jogos, Planos
  } = require("../models");

const {
  UserV, LigaV, User_LigaV, JogoV, User_GameV, User_GameM
} = require("../obj_resposta");
const { Op }      = require('sequelize');
// realiza o reload do usuário já logado!
const {ReloadLiga} = require('./ReloadLiga');

module.exports = {
  async PersistLiga(req, res) {
    const lg = await Ligas.findOne({
      where: { id : req.body.idLiga},
      include : [
        {association : "users_da_liga"},
        {association : "pedidos_da_liga"},
        {association : "jogos_da_liga"}
      ],
    });
    if(lg){
      let tam = 0;
      for (let userPed of lg.pedidos_da_liga)
        if(!userPed.Users_Pedidos_Ligas.aceite) tam++;
      
      if(lg.users_da_liga.length != req.body.users){
        return res.send({
          status  : true,
          liga    : await ReloadLiga(req.body.idLiga)
        });
      }
      if(lg.jogos_da_liga.length != (req.body.jogos3x3 + req.body.jogos5x5)){
        let liga = ReloadLiga(req.body.idLiga);
        return res.send({
          status  : true,
          liga    : await ReloadLiga(req.body.idLiga)
        });
      }
      if(tam != req.body.pedidos){
        let liga = ReloadLiga(req.body.idLiga);
        return res.send({
          status  : true,
          liga    : await ReloadLiga(req.body.idLiga)
        });
      }
    }
  }
}
