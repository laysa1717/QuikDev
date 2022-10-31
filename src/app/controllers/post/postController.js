const { Posts, Users, sequelize} = require('../../../../models')
const jwt = require('jsonwebtoken');


class Postagens {

    static async createPost(req, res) {
        var date = new Date();
        const body = req.body
        var token = req.headers.authorization

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Users.findAll({ where: { id: tokenDecodificado.id } })
            const payload = {
                user_id: usuario[0].id,
                title: body.title,
                description: body.description,
                create_time: date
            }
            const result = await Posts.create(payload)
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
    }

    static async deletePost(req, res){
        var token = req.headers.authorization
        var idPost = req.params.id
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Posts.findAll({ where: { user_id: tokenDecodificado.id, id:idPost} })
            if (usuario[0] == undefined) {
                result = 'id do post não encontrado'
            }else{
                await Posts.destroy({where: {id:idPost}})
                result = `Post com o id ${idPost} apagado`
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
    }

    static async updatePost(req, res){
        var token = req.headers.authorization
        var idPost = req.params.id
        var body = req.body
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Posts.findAll({ where: { user_id: tokenDecodificado.id, id:idPost} })
            if (usuario[0] == undefined) {
                result = 'id do post não encontrado'
            }else{
                await Posts.update(body, {where: {id:idPost}})
                result = Posts.findAll({where: {id:idPost}})
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
    }

    static async listPosts(req, res){
        console.log('oi');
        try {

            const query = `select a.title, count(b.id) as 'qtd. comentários' from db_quikdev.post a
            inner join db_quikdev.comment b
            on a.id = b.post_id
            group by 1; `

            const posts = await sequelize.query(query);
            res.status(200).json(posts[0])
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Postagens