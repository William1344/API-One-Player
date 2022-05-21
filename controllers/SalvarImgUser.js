const { Users } = require('../models');
const { Op }    = require('sequelize');

module.exports = {
  async SalvarImgUser(req, res) {
    console.log("Chamou!!!\n", req.body);
    const user = await Users.findOne({
      where: { id: req.body.idUser }
    });

    if (user) {
      user.update({
        image: req.body.val
      });
      user.save();
      return res.send({ status: true, msg: "Imagem alterada com sucesso!" });
    }else{
      return res.send({status: false, msg: "Erro ao salvar sua foto"});
    }
  }
};