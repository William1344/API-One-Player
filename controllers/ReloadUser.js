const { 
  Users, Users_Game, Ligas, Ligas_has_Users, Jogos, Planos
  } = require("../models");
const {
  UserV, LigaV, User_LigaV, JogoV, User_GameV, User_GameM, PedidosV,
  ConfLiga
} = require("../obj_resposta");
const { Op }      = require('sequelize');
// realiza o login do usuário, caso valide o login, retorna o UserMaster
// retorna o ligas[] com todos os blocos {Users_ligas, Jogos, Dest, Configs, 
// Users_Game}

async function computa_userMaster(userM){ // computa pontuações do user master
  console.log("Entrou aqui, computar UserMaster");
   
  const usersG = await Users_Game.findAll({
    where : {Users_idUsers: userM.id},
    include : [{
      association : 'jogo_pertencente'
    }]
  });

  if(usersG.length > 0){
    for(let jgd of usersG){
      await add_game_user(userM, jgd, jgd.jogo_pertencente.tipo_Jogo);
    }
    // após computar todos os jogos, realiza as médias, que são baseadas no nº de jogos
    await computa_medias(userM);
  } 
}

async function computar_jogos(userL, liga){ // para os usuários da liga
  // procura os jogos que o usuário participou para computar os pontos
  const usersG = await Users_Game.findAll({
    where : {[Op.and]:[{Users_idUsers: userL.idUsers},{Ligas_idLigas: liga.id}]},
    include : [{
      association : 'jogo_pertencente'
    }]
  });
  //console.log("computar_jogos: ", usersG);
  if(usersG.length > 0){
    // se existe jogos, computa os pontos
    for(let jgd of usersG){
     await add_game_user(userL, jgd, jgd.jogo_pertencente.tipo_Jogo);
    }
    // após computar todos os jogos, realiza as médias, que são baseadas no nº de jogos
    await computa_medias(userL);
  } 
} 

async function add_game_user(user, jgd, tipoJG){
  // adiciona os valores nos scores referente ao tipo de jogo!
  // adiciona os valores puros
  if(tipoJG == "3x3"){   
    user.scr3x3.jogos = user.scr3x3.jogos + 1;        
    if(jgd.bool_dec)    user.scr3x3.vit = user.scr3x3.vit + 1;
    if(jgd.bool_cluth)  user.scr3x3.cluth = user.scr3x3.cluth + 1;
    user.scr3x3.total_pts = user.scr3x3.total_pts + ((jgd.a_2pts * 2) + (jgd.a_3pts * 3));
    user.scr3x3.a_2pts = user.scr3x3.a_2pts + jgd.a_2pts;
    user.scr3x3.a_3pts = user.scr3x3.a_3pts + jgd.a_3pts;
    user.scr3x3.reb = user.scr3x3.reb + jgd.reb;
    user.scr3x3.asst = user.scr3x3.asst + jgd.asst;
    user.scr3x3.block = user.scr3x3.block + jgd.blk;
    user.scr3x3.roubo = user.scr3x3.roubo + jgd.roubo;
    user.scr3x3.airB = user.scr3x3.airB + jgd.airB;
    
  } else {
    user.scr5x5.jogos = user.scr5x5.jogos + 1;
    if(jgd.bool_dec)    user.scr5x5.vit = user.scr5x5.vit + 1;
    if(jgd.bool_cluth)  user.scr5x5.cluth = user.scr5x5.cluth + 1;
    user.scr5x5.total_pts = user.scr5x5.total_pts + ((jgd.a_2pts * 2) + (jgd.a_3pts * 3));
    user.scr5x5.a_2pts = user.scr5x5.a_2pts + jgd.a_2pts;
    user.scr5x5.a_3pts = user.scr5x5.a_3pts + jgd.a_3pts;
    user.scr5x5.reb = user.scr5x5.reb + jgd.reb;
    user.scr5x5.asst = user.scr5x5.asst + jgd.asst;
    user.scr5x5.block = user.scr5x5.block + jgd.blk;
    user.scr5x5.roubo = user.scr5x5.roubo + jgd.roubo;
    user.scr5x5.airB = user.scr5x5.airB + jgd.airB;

  } 
}

async function computa_medias(user){
  // calcula total de escores do jogador
  user.scrT.jogos      = user.scr3x3.jogos        + user.scr5x5.jogos;
  user.scrT.vit        = user.scr3x3.vit          + user.scr5x5.vit;
  user.scrT.cluth      = user.scr3x3.cluth        + user.scr5x5.cluth;
  user.scrT.total_pts  = user.scr3x3.total_pts    + user.scr5x5.total_pts;
  user.scrT.a_2pts     = user.scr3x3.a_2pts       + user.scr5x5.a_2pts;
  user.scrT.a_3pts     = user.scr3x3.a_3pts       + user.scr5x5.a_3pts;
  user.scrT.reb        = user.scr3x3.reb          + user.scr5x5.reb;
  user.scrT.asst       = user.scr3x3.asst         + user.scr5x5.asst;
  user.scrT.block      = user.scr3x3.block        + user.scr5x5.block;
  user.scrT.roubo      = user.scr3x3.roubo        + user.scr5x5.roubo;
  user.scrT.airB       = user.scr3x3.airB         + user.scr5x5.airB;

  // calcula as médias 3x3 do jogador 
  user.scr3x3.a_FG       = (user.scr3x3.vit * 100)  / user.scr3x3.jogos; // fg
  user.scr3x3.total_PPG  = user.scr3x3.total_pts    / user.scr3x3.jogos; // total ppg
  user.scr3x3.a_2PG      = user.scr3x3.a_2pts       / user.scr3x3.jogos; // 2pts por game
  user.scr3x3.a_3PG      = user.scr3x3.a_3pts       / user.scr3x3.jogos; // 3pts por game
  user.scr3x3.a_AirPG    = user.scr3x3.airB         / user.scr3x3.jogos; // airB por game
  user.scr3x3.a_RPG      = user.scr3x3.reb          / user.scr3x3.jogos; // reb por game
  user.scr3x3.a_APG      = user.scr3x3.asst         / user.scr3x3.jogos; // asst por game
  user.scr3x3.a_BPG      = user.scr3x3.block        / user.scr3x3.jogos; // block por game
  user.scr3x3.a_RouPG    = user.scr3x3.roubo        / user.scr3x3.jogos; // roubo por game

  // calcula as médias 5x5 do jogador
  if(user.scr5x5.jogos != 0){
    user.scr5x5.a_FG       = (user.scr5x5.vit * 100)  / user.scr5x5.jogos; // fg
    user.scr5x5.total_PPG  = user.scr5x5.total_pts    / user.scr5x5.jogos; // total ppg
    user.scr5x5.a_2PG      = user.scr5x5.a_2pts       / user.scr5x5.jogos; // 2pts por game
    user.scr5x5.a_3PG      = user.scr5x5.a_3pts       / user.scr5x5.jogos; // 3pts por game
    user.scr5x5.a_AirPG    = user.scr5x5.airB         / user.scr5x5.jogos; // airB por game
    user.scr5x5.a_RPG      = user.scr5x5.reb          / user.scr5x5.jogos; // reb por game
    user.scr5x5.a_APG      = user.scr5x5.asst         / user.scr5x5.jogos; // asst por game
    user.scr5x5.a_BPG      = user.scr5x5.block        / user.scr5x5.jogos; // block por game
    user.scr5x5.a_RouPG    = user.scr5x5.roubo        / user.scr5x5.jogos; // roubo por game
  }
  // calcula as médias totais do jogador
  if(user.scrT.jogos != 0){
    user.scrT.a_FG       = (user.scrT.vit * 100)  / user.scrT.jogos; // fg
    user.scrT.total_PPG  = user.scrT.total_pts    / user.scrT.jogos; // total ppg
    user.scrT.a_2PG      = user.scrT.a_2pts       / user.scrT.jogos; // 2pts por game
    user.scrT.a_3PG      = user.scrT.a_3pts       / user.scrT.jogos; // 3pts por game
    user.scrT.a_AirPG    = user.scrT.airB         / user.scrT.jogos; // airB por game
    user.scrT.a_RPG      = user.scrT.reb          / user.scrT.jogos; // reb por game
    user.scrT.a_APG      = user.scrT.asst         / user.scrT.jogos; // asst por game
    user.scrT.a_BPG      = user.scrT.block        / user.scrT.jogos; // block por game
    user.scrT.a_RouPG    = user.scrT.roubo        / user.scrT.jogos; // roubo por game
  }
}

async function computar_destaques(liga){
  let verr = true;
  for(let user of liga.list_users){
    // computa total de pontos da liga
    liga.total_pts = liga.total_pts + user.scrT.total_pts;
    // computar destaques da liga
    if(verr){
      verr = false;
      liga.destaques.jgd_Cluth.value      = user.scrT.cluth;
      liga.destaques.jgd_Cluth.user       = user;
      liga.destaques.jgd_Fominha.value    = user.scrT.jogos;
      liga.destaques.jgd_Fominha.user     = user;
      liga.destaques.jgd_Vencedor.value   = user.scrT.vit;
      liga.destaques.jgd_Vencedor.user    = user;
      liga.destaques.jgd_Pontuador.value  = user.scrT.total_pts;
      liga.destaques.jgd_Pontuador.user   = user;
      liga.destaques.jgd_2Pts.value       = user.scrT.a_2pts;
      liga.destaques.jgd_2Pts.user        = user;
      liga.destaques.jgd_3Pts.value       = user.scrT.a_3pts;
      liga.destaques.jgd_3Pts.user        = user;
      liga.destaques.jgd_Reboteiro.value  = user.scrT.reb;
      liga.destaques.jgd_Reboteiro.user   = user;
      liga.destaques.jgd_Assist.value     = user.scrT.asst;
      liga.destaques.jgd_Assist.user      = user;
      liga.destaques.jgd_Bloker.value     = user.scrT.block;
      liga.destaques.jgd_Bloker.user      = user;
      liga.destaques.jgd_Ladrao.value     = user.scrT.roubo;
      liga.destaques.jgd_Ladrao.user      = user;
      liga.destaques.jgd_AirBall.value    = user.scrT.airB;
      liga.destaques.jgd_AirBall.user     = user;
      liga.destaques.jgd_FG.value         = user.scrT.a_FG;
      liga.destaques.jgd_FG.user          = user;
      liga.destaques.jgd_PPG.value        = user.scrT.total_PPG;
      liga.destaques.jgd_PPG.user         = user;
      liga.destaques.jgd_2PPG.value       = user.scrT.a_2PG;
      liga.destaques.jgd_2PPG.user        = user;
      liga.destaques.jgd_3PPG.value       = user.scrT.a_3PG;
      liga.destaques.jgd_3PPG.user        = user;
      liga.destaques.jgd_APG.value        = user.scrT.a_APG;
      liga.destaques.jgd_APG.user         = user;
      liga.destaques.jgd_BPG.value        = user.scrT.a_BPG;
      liga.destaques.jgd_BPG.user         = user;
      liga.destaques.jgd_RPG.value        = user.scrT.a_RPG;
      liga.destaques.jgd_RPG.user         = user;
      liga.destaques.jgd_RouPG.value      = user.scrT.a_RouPG;
      liga.destaques.jgd_RouPG.user       = user;
      liga.destaques.jgd_AirBPG.value     = user.scrT.a_AirPG;
      liga.destaques.jgd_AirBPG.user      = user;

    }else{
      if(user.scrT.cluth > liga.destaques.jgd_Cluth.value){
        liga.destaques.jgd_Cluth.value    = user.scrT.cluth;
        liga.destaques.jgd_Cluth.user     = user;
      }
      if(user.scrT.jogos > liga.destaques.jgd_Fominha.value){
        liga.destaques.jgd_Fominha.value  = user.scrT.jogos;
        liga.destaques.jgd_Fominha.user   = user;
      }
      if(user.scrT.vit > liga.destaques.jgd_Vencedor.value){
        liga.destaques.jgd_Vencedor.value = user.scrT.vit;
        liga.destaques.jgd_Vencedor.user  = user;
      } 
      if(user.scrT.total_pts > liga.destaques.jgd_Pontuador.value){
        liga.destaques.jgd_Pontuador.value= user.scrT.total_pts;
        liga.destaques.jgd_Pontuador.user = user;
      }
      if(user.scrT.a_2pts > liga.destaques.jgd_2Pts.value){
        liga.destaques.jgd_2Pts.value     = user.scrT.a_2pts;
        liga.destaques.jgd_2Pts.user      = user;
      }
      if(user.scrT.a_3pts > liga.destaques.jgd_3Pts.value){
        liga.destaques.jgd_3Pts.value = user.scrT.a_3pts;
        liga.destaques.jgd_3Pts.user  = user;
      }
      if(user.scrT.reb > liga.destaques.jgd_Reboteiro.value){
        liga.destaques.jgd_Reboteiro.value = user.scrT.reb;
        liga.destaques.jgd_Reboteiro.user  = user;
      }
      if(user.scrT.asst > liga.destaques.jgd_Assist.value){
        liga.destaques.jgd_Assist.value = user.scrT.asst;
        liga.destaques.jgd_Assist.user  = user;
      }
      if(user.scrT.block > liga.destaques.jgd_Bloker.value){
        liga.destaques.jgd_Bloker.value = user.scrT.block;
        liga.destaques.jgd_Bloker.user  = user;
      }
      if(user.scrT.roubo > liga.destaques.jgd_Ladrao.value){
        liga.destaques.jgd_Ladrao.value = user.scrT.roubo;
        liga.destaques.jgd_Ladrao.user  = user;
      }
      if(user.scrT.airB > liga.destaques.jgd_AirBall.value){
        liga.destaques.jgd_AirBall.value = user.scrT.airB;
        liga.destaques.jgd_AirBall.user  = user;
      }
      if(user.scrT.a_FG > liga.destaques.jgd_FG.value){
        liga.destaques.jgd_FG.value = user.scrT.a_FG;
        liga.destaques.jgd_FG.user  = user;
      }
      if(user.scrT.total_PPG > liga.destaques.jgd_PPG.value){
        liga.destaques.jgd_PPG.value = user.scrT.total_PPG;
        liga.destaques.jgd_PPG.user  = user;
      }
      if(user.scrT.a_2PG > liga.destaques.jgd_2PPG.value){
        liga.destaques.jgd_2PPG.value = user.scrT.a_2PG;
        liga.destaques.jgd_2PPG.user  = user;
      }
      if(user.scrT.a_3PG > liga.destaques.jgd_3PPG.value){
        liga.destaques.jgd_3PPG.value = user.scrT.a_3PG;
        liga.destaques.jgd_3PPG.user  = user;
      }
      if(user.scrT.a_APG > liga.destaques.jgd_APG.value){
        liga.destaques.jgd_APG.value = user.scrT.a_APG;
        liga.destaques.jgd_APG.user  = user;
      }
      if(user.scrT.a_BPG > liga.destaques.jgd_BPG.value){
        liga.destaques.jgd_BPG.value = user.scrT.a_BPG;
        liga.destaques.jgd_BPG.user  = user;
      }
      if(user.scrT.a_RPG > liga.destaques.jgd_RPG.value){
        liga.destaques.jgd_RPG.value = user.scrT.a_RPG;
        liga.destaques.jgd_RPG.user  = user;
      }
      if(user.scrT.a_RouPG > liga.destaques.jgd_RouPG.value){
        liga.destaques.jgd_RouPG.value = user.scrT.a_RouPG;
        liga.destaques.jgd_RouPG.user  = user;
      }
      if(user.scrT.a_AirPG > liga.destaques.jgd_AirBPG.value){
        liga.destaques.jgd_AirBPG.value = user.scrT.a_AirPG;
        liga.destaques.jgd_AirBPG.user  = user;
      }
    }
  }
}



  async function ReloadUser(idUser) {
    // verifica se tem um usuário com este email and password
    const user = await Users.findOne({
      where: {id : idUser},
      include: [
        {association : 'pedidos_do_user', 
          include: [
            {association : 'users_da_liga'}
          ]},
        {association : 'ligas_do_user',
          include   : [
            {association : "users_da_liga"},
            {association : "confg_da_liga"},
            {association : "jogos_da_liga",
              include : [{association : "participantes_do_jogo"}]
            },
            {association : "pedidos_da_liga"},
          ]
        },
      ]
    });
    //console.log("user ->",user);
    if(user){
      let userM = new UserV(user);
      let ligas = [];
      // monta o bloco de dados do usuário
      
      // monta as ligas do usuário
      for(let lg of user.ligas_do_user){
        //console.log("lg ->\n",lg.pedidos_da_liga);
        let cnfg = new ConfLiga(lg.confg_da_liga);
        let liga = new LigaV(lg, cnfg);

        // monta os jogadores da liga
        for(let jgd of lg.users_da_liga){
          let userL = new User_LigaV(jgd, jgd.Ligas_has_Users);
          let userG = new User_GameV(jgd, jgd.Ligas_has_Users.apelido);
          await computar_jogos(userL, liga);
          liga.list_users.push(userL);
          liga.list_usersG.push(userG);
        }
        // monta os jogos da liga
        for(let jg of lg.jogos_da_liga){
          let jogo = new JogoV(jg);
          // monta os jogadores do jogo
          for(let jgd of jg.participantes_do_jogo){
            let userG = new User_GameM(jgd);
            if(jgd.time == "A") {jogo.timeA.push(userG);}
            else if(jgd.time == "B") {jogo.timeB.push(userG);}
            else{jogo.timeS.push(userG);}
          }
          if(jg.tipo_Jogo == "3x3"){liga.listJgs3x3.push(jogo)}
          else if(jg.tipo_Jogo == "5x5"){liga.listJgs5x5.push(jogo)}
          else {liga.listJgsNxN.push(jogo);}
        }
        /* 
          INSERT INTO `users_pedidos_ligas`(`Ligas_idLigas`, `Users_idUsers``createdAt`, `updatedAt`) 
          VALUES 
          (7, 28, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
          (8, 14, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
        */
        // monta os pedidos da liga
        for(let pedido of lg.pedidos_da_liga){
          //console.log("Pedido ->\n",pedido);
          //console.log("Pedido.Users_Pedidos_Ligas ->\n",pedido.Users_Pedidos_Ligas);
          if( !pedido.Users_Pedidos_Ligas.aceite ) {
            let usL = {
              apelido   :  pedido.Users_Pedidos_Ligas.apelido,
              nome      :  pedido.nome,
              image     :  pedido.image,
            }
            let pedV = new PedidosV(pedido.Users_Pedidos_Ligas, usL);
            if( !liga.pedidoIsOn ) liga.pedidoIsOn = true;
            liga.pedidos.push(pedV);
            console.log("PedidoV ->\n",pedV);
          }
        }
        await computar_destaques(liga);
        //console.log("Destaques", liga.destaques);
        ligas.push(liga);
      }
      let peds = [];
      // monta os pedidos do usuário
      for(let pedU of user.pedidos_do_user){
        //montar o pedido do usuário como um bloco liga!
        //console.log("Pedido do user", pedU.Users_Pedidos_Ligas);
        if(!pedU.Users_Pedidos_Ligas.aceite){
          let pe = {
            pedid     :   true,
            id        :   pedU.Users_Pedidos_Ligas.id,
            nome      :   pedU.nome,
            img_log   :   pedU.img_liga,
            local     :   pedU.local,
            createdAt :   pedU.createdAt,
            membros   :   pedU.users_da_liga.length,
          }
          //console.log("PE ->\n",pe);
          peds.push(pe);
        }
      } 

      await computa_userMaster(userM);
      console.log("Realizou login com sucess")
      return {
        userM   : userM, 
        ligas   : ligas,  
        pedidos : peds,
        status  : true,
        msg     : "Reload Realizado com sucesso"
      };
    } else { 
      console.log("Não realizou reload com sucess")
      return {
        status: false,
        msg   : "Não realizou reload com sucess"
      }
    }
    
  }
module.exports = ReloadUser;
