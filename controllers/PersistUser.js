const { Users } = require("../models");

const {
  UserV, LigaV, User_LigaV, JogoV, User_GameV, User_GameM
} = require("../obj_resposta");

const ReloadUser = require('./ReloadUser');

const { Op }      = require('sequelize');
// realiza o reload do usuário já logado!

/* --- Requisitos e Etapas --- 
  na parte do usuário, verificar número de ligas e pedidos,
  o pedido pode ser aceito ou recusado
  verificar numero de participações em jogos
)*/
module.exports = {
  async PersistUser(req, res) {
    console.log("PersistUser", req.body);
    const user = await Users.findOne({
      where:{ id : req.body.idUser},
      include: [
        {association : "ligas_do_user"},
        {association : "pedidos_do_user"},
        {association : "users_game_values"}
      ],
    });

    if(user){
      // verifica os parametros de entrada
      let tam = 0;
      for (let us of user.pedidos_do_user)
        if(!us.Users_Pedidos_Ligas.aceite) tam++; 
        
      if(req.body.peds != tam){
        // ouve alterações
        console.log("Ouve alterações no pedido do usuário");
        return res.send(await ReloadUser(req.body.idUser));
      } else if(req.body.ligas != user.ligas_do_user.length){
        // ouve alterações
        console.log("Ouve alterações no número de ligas do usuário");
        return res.send(await ReloadUser(req.body.idUser));
      } else if(req.body.jogos != user.users_game_values.length){
        // ouve alterações
        console.log("Ouve alterações no número de jogos do usuário");
        return res.send(await ReloadUser(req.body.idUser));
      } else {
        // não ouve alterações
        return res.send({ status : false });
      }
    }

  }
}
