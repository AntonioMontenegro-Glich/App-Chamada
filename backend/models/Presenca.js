//Importando o Banco de Dados para Fazer os Esquemas 
const mongoose = require('mongoose');

const PresencaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    resumo_aula: { type: String, required: true },
    mensagem_do_aluno: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    photo: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Presenca', PresencaSchema);
