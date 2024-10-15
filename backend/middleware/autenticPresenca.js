const config = require('jsonwebtoken');
const AutPresenca = require('../models/Presenca');
//Exportando o modelo de Presença que contem as informações que compõem a presença
//Criando constante autenticaHeader que vai guardar uma requisição do header('Authorization)
//Condição if (!autenticaHeader) para verificar se o usuário tem autorização de entrar no sistema, se não ele retorna mensagem (401) de erro
//resolvido conflitos
module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Sem token, autorização negada' });
  }
   //Usuário passou pela autorização
  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Erro, autorização negada' });
  }

  try {
    const decodificar = jwt.verify(token, process.env.SECRET);
    req.AutPresenca = await User.findById(decodificar.id);
    if (!req.AutPresenca) {
      return res.status(401).json({ message: 'Erro , autorização negada' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token não valido' });
  }
};