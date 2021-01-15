const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
    async index(req, res){
        const studentId = req.params.id;

        try {
            let perguntas = await Question.findAll({
                where: {
                    aluno_id: studentId
                }
            });

            res.status(200).send(perguntas)
        } catch (error) {
            res.status(500).send({erro: "erro"})
        }
    },
    
    async store(req, res){
        const {titulo, descricao, imagem, gist, categorias} = req.body;

        const alunoId = req.headers.authorization;

        try {
            //buscar o aluno pelo ID 
            let aluno = await Student.findByPk(alunoId);

            //se o aluno não existir, retorna erro
            if (!aluno) 
                return res.status(404).send({erro: "Student nao encontrado"});
            
            //crio a pergunta para este aluno
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist });

            await pergunta.addCategories(categorias);

            //retornar sucesso
            res.status(201).send(pergunta);
            
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },

    find(req, res){

    },

    async update(req, res){
        const perguntaId = req.params.id;

        const {titulo, descricao} = req.body;
        
        try {
            let pergunta = await Question.findByPk(perguntaId);
            
            if(!pergunta)
                return res.status(404).send({erro: "pergunta nao encontrada"});
            
            if (req.headers.authorization === pergunta.aluno_id.toString()){
                pergunta.titulo = titulo;
                pergunta.descricao = descricao;

                pergunta.save();

                res.status(201).send("conteudo atualizado com sucesso")
            }
        } catch (error) {
            console.log(error);
            
            res.status(500).send({erro: "erro!!!!!!!!!!!"})
        }

    },

    async delete(req, res){
        const questionId = req.params.id;

        const studentId = req.headers.authorization

        try {
            let question = await Question.findByPk(questionId);
            
            if(!question)
                return res.status(404).send({erro: "question nao encontrada"})
            
            if (studentId === question.aluno_id.toString()){
                await question.destroy();

                res.status(201).send("question deletada com sucesso")
            }
        } catch (error) {
            console.log(error);
            
            res.status(500).send({erro:"erro"})
        }

    }
}