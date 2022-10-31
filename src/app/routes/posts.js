require('dotenv').config()
const { Router } = require('express');
const Postagens = require('../controllers/post/postController.js')

const router = Router()

router.post('/createPost', Postagens.createPost);
router.delete('/deletePost/:id', Postagens.deletePost);
router.put('/updatePost/:id', Postagens.updatePost);
router.get('/listPosts', Postagens.listPosts);


module.exports = router