const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    /*
        aqui inicializamos nossos campos da tabela
        os campos automaticos nao precisam ser declarados
    */
    static init(sequelize){
        super.init(
            {
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING
            },
            {
                sequelize,
                tableName: "alunos"
            }
        )
    }

    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        //a classe Student tem varias Perguntas
        this.hasMany(models.Question, {foreignKey: "aluno_id"});
        this.hasMany(models.Answer, {foreignKey: "aluno_id"});
    }
}

module.exports = Student;