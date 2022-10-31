const { Users } = require('../../../../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

var resultUsers = {};
var passwordHash = '';
var idUser = '';
var token = '';


class Peoples {

    static async login(req, res) {
        const email = req.params.email
        const senha = req.params.password
        const resultUser = await Users.findAll({ where: { email: email } });

        if (resultUser.length == 0) {
            idUser = 'falha'
        } else {
            idUser = resultUser[0].id
            passwordHash = resultUser[0].password
           
            const senhaValida = await bcrypt.compare(senha, passwordHash);
            if (!senhaValida) {
                res.status(500).json('Verifique se e-mail ou senha estão corretos.')
            }else{
                const payload = {
                    id: idUser
                }
                token = jwt.sign(payload, process.env.CHAVE_JWT);
            }
        }
        try {
            res.set('Authorization', token)
            res.status(200).json(idUser)
        } catch (error) {
            // res.status(500).json('Verifique se e-mail ou senha estão corretos.' + error)
        }
    }

    static async getUser(req, res) {
        const listUsers = await Users.findAll();
        try {
            if (listUsers.length == 0) {
                resultUsers = 'Nenhum usuário cadastrado, por favor, cadastre um.'
            } else {
                resultUsers = listUsers[0]
            }
            res.status(200).json(resultUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async createUser(req, res) {

        // const id = 0
        const name = req.params.name
        const email = req.params.email
        const password = req.params.password

        try {
        const custoHash = 12;
        passwordHash = await bcrypt.hash(password, custoHash);

      
            await Users.create({
                // id: id,
                name: name,
                email: email,
                password: passwordHash
            })
            const listUsers = await Users.findOne({ where: { name: name } })
            res.status(200).json(listUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateUser(req, res) {
        var token = req.headers.authorization
        var body = req.body
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Users.findAll({ where: { id: tokenDecodificado.id} })
            if (usuario[0] == undefined) {
                result = 'Usuário não encontrado'
            }else{
                await Users.update(body, {where: {id:tokenDecodificado.id}})
                result = Users.findAll({where: {id:tokenDecodificado.id}})
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
    }

    static async deleteUser(req, res) {
        var token = req.headers.authorization
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Users.findAll({ where: { id: tokenDecodificado.id} })
            if (usuario[0] == undefined) {
                result = 'Usuário não encontrado'
            }else{
                await Users.destroy({where: {id:tokenDecodificado.id}})
                result = `Usuário com o id: ${tokenDecodificado.id} apagado`
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
    }


}

module.exports = Peoples