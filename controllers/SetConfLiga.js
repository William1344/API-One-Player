const { Configs_Ligas }  = require('../models');

module.exports = {
  async SetConfLiga(req, res) {
    let conf_rec = req.body.config;
    let conf = await Configs_Ligas.findOne({ where: { id: req.body.config.id}});
    if (conf) {
      conf.update({
        rebote      : conf_rec.rebote,
        assist      : conf_rec.assist,
        block       : conf_rec.block,
        airB        : conf_rec.airB,
        //roubo     : conf_rec.roubo,
        marc24      : conf_rec.marc24,
        auto_troca  : conf_rec.auto_troca,
        //faltas    : conf_rec.faltas,
        selSubs     : conf_rec.selSubs,
      });
      await conf.save();
      console.log("Salvou as configurações da liga");
      return res.send({status: true});

    } else {
      return res.send({status: false, msg: "Ocorreu um erro inesperado, tente mais tarde!"})
    }


  }
};