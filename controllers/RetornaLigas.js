const { Ligas } 	= require('../models');
const { Op }			= require('sequelize')

module.exports = {
	async RetornaLigas(req, res){
		const ligas = await Ligas.findAll({
			where: {[Op.or]:[{nome:req.body.nome},{local:req.body.nome}]},
			include: [
				{association : "users_da_liga"},
				{association : "jogos_da_liga"},
			]
		});
		
		if(ligas.length > 0){
			let array_ligas = [];
			let obj = {};
			for (let lg of ligas){
				obj = {
					id						: lg.id,
					nome					: lg.nome,
					local					: lg.local,
					membros				: lg.users_da_liga.length,
					createdAt			: lg.createdAt,
					image 				: lg.image,
				};
				array_ligas.push(obj);
			}
			
			return res.send({
			  status 			: true,
				ligasPesq		: array_ligas,
			})
		} else return res.send({
				status 	: false,
				msg			:	"Parece que não encontramos sua liga!"
			});
	} 
}
