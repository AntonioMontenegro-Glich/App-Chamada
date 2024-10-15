const jwt = require('jsonwebtoken');
const Presenca = require('../models/Presenca');

exports.Presenca = async (req, res) => {
  try {
    const { nome , resumo_aula , mensagem_do_aluno , location , photo , create_at } = req.body;
    const Presenca = new Presenca({ nome , resumo_aula , mensagem_do_aluno , location , photo , create_at  });
    await Presenca.save();
    res.status(201).json({ message: 'Presença registrada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Presenca = async (req, res) => {
  try {
    const {  nome  } = req.body;
    const Presenca = await Presenca.findOne({ nome });
    if (!Presenca || !(await Presenca.compareNome(nome))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.Presenca({ id: Presenca._id }, config.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};