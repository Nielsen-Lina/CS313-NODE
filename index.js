const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client, defaults } = require('pg')
const connectionString = 'postgres://rcwxhvodpnbhvc:eb2aff81e7eff233ab9bdcbf90c66e03bce85894418592a2a1f5163e1664cbf4@ec2-54-235-193-0.compute-1.amazonaws.com:5432/d2k6pqiar0umjq'
const RecipeController = require('./controller/recipe')
defaults.ssl = true
let router = express.Router()

router.get('/getRecipe/:id', RecipeController.getDetails)
router.post('/addRecipe', RecipeController.addRecipe)
router.delete('/deleteRecipe/:id', RecipeController.deleteRecipe)
router.post('/editRecipe', RecipeController.editRecipe)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/recipe', (req, res) => res.render('pages/recipe'))
  .get('/app', RecipeController.getAllRecipes)
  .use('/api/', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
