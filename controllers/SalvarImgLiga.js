const { Ligas } 	= require('../models');

module.exports = {
	async SalvarImgLiga(req, res){
		console.log("Chamou!!!\n", req.body);
    const liga = await Ligas.findOne({
      where: { id: req.body.idLiga }
    });

    if (liga) {
      liga.update({
        img_liga	: req.body.val
      });
      liga.save();
      return res.send({ status: true, msg: "Imagem alterada com sucesso!" });
    }else{
      return res.send({status: false, msg: "Erro ao salvar sua foto"});
    }
	}
}
