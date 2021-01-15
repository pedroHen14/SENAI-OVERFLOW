const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    /*
        aqui inicializamos nossos campos da tabela
        os campos automaticos nao precisam ser declarados
    */
    static init(sequelize){
        super.init(
            {
                titulo: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem: DataTypes.STRING,
                gist: DataTypes.STRING
            },
            {
                sequelize,
                tableName: "perguntas"
            }
        )
    }

    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        //classe Question pertence a Aluno
        this.belongsTo(models.Student, {foreignKey: "aluno_id"});
        this.belongsToMany(models.Category, {through: "question_category" });
        this.hasMany(models.Answer);
    }
}

module.exports = Question;