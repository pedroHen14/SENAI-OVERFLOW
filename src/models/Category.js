const { Model, DataTypes } = require("sequelize");

class Category extends Model {
    /*
        aqui inicializamos nossos campos da tabela
        os campos automaticos nao precisam ser declarados
    */
    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING
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
        this.belongsToMany(models.Question, {through: "question_category" });
    }
}

module.exports = Category;