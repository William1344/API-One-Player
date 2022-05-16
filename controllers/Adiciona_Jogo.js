const { Jogos, Users_Game }   = require('../models');
const JogoV = require('../obj_resposta/JogosV');
const User_GameM = require('../obj_resposta/User_GameM');
const {ReloadLiga} = require('./ReloadLiga');

async function add_gameUserM(jgd, user, tipoJG){
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
    
  } else if(tipoJG == "5x5"){
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
  user.scr5x5.a_FG       = (user.scr5x5.vit * 100)  / user.scr5x5.jogos; // fg
  user.scr5x5.total_PPG  = user.scr5x5.total_pts    / user.scr5x5.jogos; // total ppg
  user.scr5x5.a_2PG      = user.scr5x5.a_2pts       / user.scr5x5.jogos; // 2pts por game
  user.scr5x5.a_3PG      = user.scr5x5.a_3pts       / user.scr5x5.jogos; // 3pts por game
  user.scr5x5.a_AirPG    = user.scr5x5.airB         / user.scr5x5.jogos; // airB por game
  user.scr5x5.a_RPG      = user.scr5x5.reb          / user.scr5x5.jogos; // reb por game
  user.scr5x5.a_APG      = user.scr5x5.asst         / user.scr5x5.jogos; // asst por game
  user.scr5x5.a_BPG      = user.scr5x5.block        / user.scr5x5.jogos; // block por game
  user.scr5x5.a_RouPG    = user.scr5x5.roubo        / user.scr5x5.jogos; // roubo por game

  // calcula as médias totais do jogador
  user.scrT.a_FG       = (user.scrT.vit * 100)  / user.scrT.jogos; // fg
  user.scrT.total_PPG  = user.scrT.total_pts    / user.scrT.jogos; // total ppg
  user.scrT.a_2PG      = user.scrT.a_2pts       / user.scrT.jogos; // 2pts por game
  user.scrT.a_3PG      = user.scrT.a_3pts       / user.scrT.jogos; // 3pts por game
  user.scrT.a_AirPG    = user.scrT.airB         / user.scrT.jogos; // airB por game
  user.scrT.a_RPG      = user.scrT.reb          / user.scrT.jogos; // reb por game
  user.scrT.a_APG      = user.scrT.asst         / user.scrT.jogos; // asst por game
  user.scrT.a_BPG      = user.scrT.block        / user.scrT.jogos; // block por game
  user.scrT.a_RouPG    = user.scrT.roubo        / user.scrT.jogos; // roubo por game
  
  return user;

}


module.exports = {
  async Adiciona_Jogo(req, res) {
    // adiciona um jogo e seus jogadores... retorna se adicionou ou não
    
    try{
      let jogado = null;
      const jg = await Jogos.create(req.body.jogo);
      //console.log("Jogo criado: ", jg);
      let game = new JogoV(jg);
      for(let jgd of req.body.timeA){  
        const usG = await Users_Game.create({
          Ligas_idLigas: jg.Ligas_idLigas,
          Users_idUsers: jgd.Users_idUsers,
          Jogos_idJogos: jg.id,
          apelido: jgd.apelido,
          num_camisa: jgd.num_camisa,
          time : "A",
          a_2pts: jgd.a_2pts,
          a_3pts: jgd.a_3pts,
          reb: jgd.reb,
          asst: jgd.asst,
          blk: jgd.blk,
          airB: jgd.airB,
          roubo: jgd.roubo,
          bool_dec : jgd.bool_dec,
          bool_cluth : jgd.bool_cluth
        });

        let userG = new User_GameM(jgd);
        game.timeA.push(userG);
        console.log("Id do user Master");
        console.log(req.body.userM.id);
        if(jgd.Users_idUsers == req.body.userM.id) jogado = jgd;
      }
      for(let jgd of req.body.timeB){  
        const usG = await Users_Game.create({
          Ligas_idLigas: jg.Ligas_idLigas,
          Users_idUsers: jgd.Users_idUsers,
          Jogos_idJogos: jg.id,
          apelido: jgd.apelido,
          num_camisa: jgd.num_camisa,
          time : "B",
          a_2pts: jgd.a_2pts,
          a_3pts: jgd.a_3pts,
          reb: jgd.reb,
          asst: jgd.asst,
          blk: jgd.blk,
          airB: jgd.airB,
          roubo: jgd.roubo,
          bool_dec : jgd.bool_dec,
          bool_cluth : jgd.bool_cluth
        });
        let userG = new User_GameM(jgd);
        game.timeB.push(userG);
        if(jgd.Users_idUsers == req.body.userM.id) jogado = jgd;
      }
      for(let jgd of req.body.timeS){  
        const usG = await Users_Game.create({
          Ligas_idLigas: jg.Ligas_idLigas,
          Users_idUsers: jgd.Users_idUsers,
          Jogos_idJogos: jg.id,
          apelido: jgd.apelido,
          num_camisa: jgd.num_camisa,
          time : "S",
          a_2pts: jgd.a_2pts,
          a_3pts: jgd.a_3pts,
          reb: jgd.reb,
          asst: jgd.asst,
          blk: jgd.blk,
          airB: jgd.airB,
          roubo: jgd.roubo,
          bool_dec : jgd.bool_dec,
          bool_cluth : jgd.bool_cluth
        });
        let userG = new User_GameM(jgd);
        game.timeS.push(userG);
        if(jgd.Users_idUsers == req.body.userM.id) jogado = jgd;

      }
      let userMM = null;
      if(jogado != null) userMM = await add_gameUserM(jogado, req.body.userM, game.tipo);
      let liga = await ReloadLiga(req.body.jogo.Ligas_idLigas);
      console.log("Liga atualizada: ", liga.id);
      return res.send({status : true , game: game,userM : userMM, liga: liga, msg : "Jogo armazenado com sucesso!"});

    }catch(err){
      console.log("Erro ao adicionar jogo: ", err);
      return res.send({
        status: false,
        dado : "Erro ao adicionar jogo"
      });
    }
    
  }
};