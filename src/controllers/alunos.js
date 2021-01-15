const Student = require("../models/Student");

module.exports = {
    //cria a função que vai ser execultada pela rota
    async listarAlunos(req, res) {

        try {
            const alunos = await Student.findAll();
        
            res.send(alunos);
        } catch (error) {
            console.log(error);
            res.status(500).send({error})
        }
        
    },
    //cria a função que vai ser execultada pela rota
    async buscarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id;

        try {
            let aluno = await Student.findByPk(alunoId, {
                attributes: ["id", "nome", "ra", "email"]
            });

            //se aluno nao encontrado retornar not foud
            if (!aluno)
                return res.status(404).send({ erro: "Student não encontrado" });
            //se aluno encontrado retornar o aluno

            res.send(aluno);
        } catch (error) {
            
        }
    },

    //cria a função que vai adicionar alunos
    async adicionarAlunos(req, res) {
        //receber os dados do body
        const {ra, nome, email, senha} = req.body;
        
        try {

            //SELECT * FROM ALUNOS WHERE ra = ? AND email = ?
            let aluno = await Student.findOne({
                where: {
                    ra
                }
            })

            if (aluno) {
                return res.status(400).send({erro: "Student ja cadastrado"})
            }
        
            aluno = await Student.create({ra, nome, email, senha});

            //retornar uma resposta de sucesso
            res.status(201).send({id: aluno.id});
        } catch (error) {
            res.status(500).send({error});
        }

        
    },

    async deletarAluno(req, res) {
        //recuperar o id do aluno a ser deletado
        const alunoId = req.params.id;

        try {
            let aluno = await Student.findByPk(alunoId);

            if (!aluno) 
                return res.status(404).send({erro: "aluno nao encontrado"});
            
            await aluno.destroy();

            //devolver resposta de sucesso
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async editarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id;

        //recuperar os dados do corpo
        const {nome, email} = req.body;

        try {
            let aluno = await Student.findByPk(alunoId);

            if (!aluno) 
                res.status(404).send({erro: "Student nao encontrado"});
            
            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

            //retornar resposta
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }

        
    }
}