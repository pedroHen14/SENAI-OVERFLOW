const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Student = require("../models/Student");

module.exports = {
    async store(req, res){
        const {answer} = req.body;
    
        const alunoId = req.headers.authorization;

        const perguntaId = req.params.id;
    
        try {
            //buscar o pergunta pelo ID 
            let pergunta = await Question.findByPk(perguntaId);
    
            //se o aluno não existir, retorna erro
            if (!pergunta) 
                return res.status(404).send({erro: "pergunta nao encontrado"});

            const resposta = await pergunta.createAnswer({answer, aluno_id: alunoId});


            //dessa forma pode causar problemas quano sa campo nulo no banco
            // let resposta = await pergunta.createAnswer({ answer });
            //
            // aluno.addAnswers(resposta);
    
            //retornar sucesso
            res.status(201).send(resposta);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    
    }
}
