require('dotenv').config()
const { Router } = require('express');
const Users = require('../controllers/user/userController.js')

const router = Router()

router.get('/users', Users.getUser);
router.get('/login/:email/:password', Users.login);
router.post('/createUser/:name/:email/:password', Users.createUser);
router.put('/updateUser', Users.updateUser);
router.delete('/deleteUser', Users.deleteUser);

module.exports = router