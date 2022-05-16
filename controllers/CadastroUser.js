const {Users} = require('../models');
const UsersV = require('../obj_resposta/UserV');

module.exports = {
  async CadastroUser(req, res) {
    console.log("post entrou cadastro", req.body.new_user.email);
  
      // verifica se tem um usuário com este email || telefone
      const proc = await Users.findAll({where : {email : req.body.new_user.email}});
      if(proc.length != 0){
        return res.send({dado : "Email já cadastrado", status : false});
      }
      // se não tem email cadastrado, realiza o cadastro
      const user = await Users.create(req.body.new_user);
      let us = new UsersV(user);
      console.log("User add ->",user);
      if(user){
        return res.send({dado:us, status:true});
      }else{ 
        return res.send({dado:"Estamos com problemas para armazenar seus dados, tente novamente mais tarde", status:false});
        console.log("Erro ao cadastrar usuário ->",err);
      }
  }
};