const bodyParser = require('body-parser')
 
const user = require('./users.js')
const post = require('./posts.js')
const comment = require('./comments.js')

module.exports = app => {
 app.use(
   bodyParser.json(),
   bodyParser.urlencoded({ extended: false }),
      user,
      post,
      comment
   )
 }
