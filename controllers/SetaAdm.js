const { 
    Ligas_has_Users
}  = require('../models');
const { Op }          = require('sequelize');

module.exports = {
  async SetaAdm(req, res) {
    // setar o adm!
    // procurar a relação do usuario com a liga e setar o adm!
    const lhu = await Ligas_has_Users.findOne({
      where: {[Op.and]: [{Users_idUsers : req.body.userL.idUsers},{Ligas_idLigas : req.body.idLiga}]}
    });

    if(lhu){
      if(req.body.bool){
        await lhu.update({
          isAdmin : true
        });
        await lhu.save();
        return res.send({ status: true , msg : "Adm setado com sucesso!"});
      } else {
        await lhu.update({
          isAdmin : false
        });
        await lhu.save();
        return res.send({ status: true , msg : "Adm removido com sucesso!"});
      }
    } else return res.send({ status: false , msg : "Tivemos um erro inesperado, tente novamente mais tarde!"});

  }
};