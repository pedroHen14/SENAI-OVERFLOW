const { DataTypes, Model } = require("sequelize");

class Answer extends Model {
    static init(sequelize){
        super.init(
            {
                answer: DataTypes.TEXT
            },
            {
                sequelize,
            }
        )
    }

    /*
        Aqui configuramos os relacionamentos
    */
    static associate(models){
        this.belongsTo(models.Student, {foreignKey: "aluno_id"});
        this.belongsTo(models.Question);
    }
}

module.exports = Answer;