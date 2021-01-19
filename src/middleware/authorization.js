const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");

module.exports = (req, res, next) => {

    //pegando o campo autorização do cabeçalho da requisição
    const {authorization} = req.headers;

    //verifica se o campo foi informado, se não retorna erro 
    if (!authorization) 
        return res.status(401).send({error: "token nao informado"});

    //separa o prefixo do token
    const [Bearer, token] = authorization.split(" ");

    //verifica se o token esta presente,  se não retorna erro
    if (!token) 
        return res.status(401).send({error: "token mal formatado"});
        
    try {

        //verifica se o token é valido, se não cai no catch
        const payload = jwt.verify(token, auth.secret);

        //coloca o id do aluno na requisição
        req.studentId = payload.studentId;

        //envia a requisição para frente (controller)
        return next();

    } catch (error) {

        //retorna erro de token invalido
        console.log(error);
        res.status(500).send({error: "token invalido"});

    }  
    
}