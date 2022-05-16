const { Users } 	= require('../models');
const { Op }			= require('sequelize')

module.exports = {
	async RetornaUsers(req,res){
		const users = await Users.findAll({
				where : {nome : req.body.nome}
		});
		
		if(users.length > 0){
			let array_users = [];
			let obj = {};
			for(let user of users){
				obj = {
					nome 					: user.nome,
					Users_idUsers : user.id
				}
				array_users.push(obj);
			}
			return res.send({
					status : true,
					arrayUser: array_users
			});
			
		} else return res.send({
				status: false,
				msg		: "Não foram localizados usuários com esse nome"
			});
	}
}
