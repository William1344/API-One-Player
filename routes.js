const express = require('express');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './images');
  },
  filename: function(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

const routes = express.Router();
/*
const { 
  Adiciona_Jogo, CadastroLiga, CadastroUser, CadastroUserAno, CancelaPedido, 
  LoginUser, PersistLiga, PersistUser, RealizaPedido, ReloadLiga, ReloadUser, 
  ResgataLiga, RetornaLigas, RetornaUsers, SalvarInfosUser, SetaAdm, SetaPedido, 
  SetConfLiga
} = require('./controllers');*/

const { SetaPedido }      = require('./controllers/SetaPedido');
const { SetaAdm }         = require('./controllers/SetaAdm');
const { CadastroUser}    	= require('./controllers/CadastroUser');
const { LoginUser}       	= require('./controllers/LoginUser');
const { CadastroLiga}    	= require('./controllers/CadastroLiga');
const { CadastroUserAno} 	= require('./controllers/CadastroUserAno');
const { Adiciona_Jogo }  	= require('./controllers/Adiciona_Jogo');
const { RealizaPedido }   = require('./controllers/RealizaPedido');
const { CancelaPedido }   = require('./controllers/CancelaPedido');
const { RetornaUsers}			= require('./controllers/RetornaUsers');
const { ResgataLiga}			= require('./controllers/ResgataLiga');
const { RetornaLigas}			= require('./controllers/RetornaLigas');
const { SalvarInfosUser} 	= require('./controllers/SalvarInfosUser');
const { SetConfLiga}      = require('./controllers/SetConfLiga');
//const { SalvarImgUser}  = require('./controllers/SalvarImgUser');
const { SalvarImgLiga}		= require('./controllers/SalvarImgLiga');
const { PersistLiga}			= require('./controllers/PersistLiga');
const { PersistUser}			= require('./controllers/PersistUser');

routes.post('/seta_pedido',         SetaPedido);
routes.post('/setarAdm',            SetaAdm);
routes.post('/cadastro_user',       CadastroUser);
routes.post('/cadastro_user_ano',   CadastroUserAno);
routes.post('/login_user',          LoginUser);
routes.post('/cadastro_liga',       CadastroLiga);
routes.post('/adiciona_jogo',       Adiciona_Jogo);
routes.post('/criar_pedido',        RealizaPedido);
routes.post('/cancela_pedido',      CancelaPedido);
routes.post('/salvar_infos_user',   SalvarInfosUser);
routes.post('/resgata_liga',        ResgataLiga);

routes.post('/getLigas',            RetornaLigas);
routes.post('/getUsers',            RetornaUsers);
routes.post('/salvar_conf_liga',    SetConfLiga);

routes.post('/persistLiga',          PersistLiga);
routes.post('/persistUser',          PersistUser);

routes.post('/salvar_image_user', upload.array('photo', 3), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.send({status: true});
});

routes.get('/', (req, res) => {
  return res.send({msg:"Infos: " +
    "nome: API One Player Basketball " +
    "versao: 1.0.0 " +
    "criador: William1344 " +
    "msg: pai ta onn! "
  })
});


module.exports = routes;