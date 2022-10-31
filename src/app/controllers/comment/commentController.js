const { Posts, Users, Comments} = require('../../../../models')
const jwt = require('jsonwebtoken')


class Comentarios{

    static async createComment(req, res){

        var date = new Date();
        const body = req.body
        var token = req.headers.authorization
        var postId= req.params.post_id
        console.log(postId);

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Users.findAll({ where: { id: tokenDecodificado.id } })
            const payload = {
                id_user: usuario[0].id,
                post_id:postId,
                description: body.description,
                create_time: date
            }
            console.log(payload);
            const result = await Comments.create(payload)
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }
        
    }

    static async deleteComment(req, res){

        var token = req.headers.authorization
        var idPost = req.params.post_id
        var idComment = req.params.comment_id
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Comments.findAll({ where: { id_user: tokenDecodificado.id, post_id:idPost, id:idComment} })
            if (usuario[0] == undefined) {
                result = 'Comentario não encontrado ou você não tem permissão para deletar este comentário'
            }else{
                await Comments.destroy({where: {id:idComment}})
                result = `Comentário '${usuario[0].description}' deletado`
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }


    }
    static async updateComment(req, res){
        
        var token = req.headers.authorization
        var idPost = req.params.post_id
        var idComment = req.params.comment_id
        var body = req.body
        var result =  '';

        try {
            const tokenDecodificado = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Comments.findAll({ where: { id_user: tokenDecodificado.id, post_id:idPost, id:idComment} })
            if (usuario[0] == undefined) {
                result = 'Comentario não encontrado ou você não tem permissão para editar este comentário'
            }else{
                await Comments.update(body, {where: {id:idComment}})
                result = `Comentário '${usuario[0].id}' editado`
            }
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json('Token invalido. Por favor, insira um token valido')
        }


    }
}

module.exports = Comentarios