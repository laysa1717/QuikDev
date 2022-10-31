require('dotenv').config()
const { Router } = require('express');
const Comentarios = require('../controllers/comment/commentController.js')

const router = Router()

router.post('/createComment/:post_id', Comentarios.createComment);
router.delete('/deleteComment/:post_id/:comment_id', Comentarios.deleteComment);
router.put('/updateComentario/:post_id/:comment_id', Comentarios.updateComment);


module.exports = router