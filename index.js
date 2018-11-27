const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client, defaults } = require('pg')
const connectionString = 'postgres://rcwxhvodpnbhvc:eb2aff81e7eff233ab9bdcbf90c66e03bce85894418592a2a1f5163e1664cbf4@ec2-54-235-193-0.compute-1.amazonaws.com:5432/d2k6pqiar0umjq'

defaults.ssl = true;

let router = express.Router();
// router.get('/getPerson/:id', async function(req, res, next) {
//   const client = new Client({
//     connectionString: connectionString,
//   })
//   await client.connect()
//     client.query('SELECT * FROM person WHERE id = $1 LIMIT 1', [req.params.id], function(err, result) {
//       console.log(result);
//       client.end();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result.rows[0]);
//     });
//   // });
// });
// router.get('/getParents/:id', async function(req, res, next) {
//   const client = new Client({
//     connectionString: connectionString,
//   })
//   await client.connect()
//     client.query('SELECT p.* FROM person p JOIN relationship ON child = p.id WHERE child = $1', [req.params.id], function(err, result) {
//       console.log(result);
//       client.end();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result.rows);
//     });
// });
// router.get('/getChildren/:id', async function(req, res, next) {
//   const client = new Client({
//     connectionString: connectionString,
//   })
//   await client.connect()
//     client.query('SELECT p.* FROM person p JOIN relationship ON parent = p.id WHERE parent = $1', [req.params.id], function(err, result) {
//       console.log(result);
//       client.end();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result.rows);
//     });
// });

router.get('/getRecipe/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT * FROM recipe WHERE recipe_id = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows[0]);
    });
});

// router.get('/getRecipeDetails/:id', async function(req, res, next) {
//   const client = new Client({
//     connectionString: connectionString,
//   })
//   await client.connect()
//   	var sql = 'SELECT r.recipe_name, ing.ingredient_names, ins.instruction_data FROM recipe r JOIN ingredient ing ON r.recipe_id = ing.recipe_id JOIN instruction ins ON r.recipe_id = ins.recipe_id WHERE r.recipe_id = $1 LIMIT 1';
//     client.query(sql, [req.params.id], function(err, result) {
//       console.log(result);
//       client.end();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result.rows);
//     });
// });

router.post('/addRecipe', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
  	var sql = 'INSERT INTO recipe(recipe_name, ingredients, instructions) VALUES($1, $2, $3)';
    client.query(sql, [req.params.name, req.params.ingredient, req.params.instruction], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});

router.delete('/deleteRecipe/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
  	var sql = 'DELETE FROM recipe WHERE id = $1';
    client.query(sql, [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});

router.put('/editRecipe', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
  	var sql = 'UPDATE recipe SET recipe_name = $1, ingredients = $2, instructions = $3 WHERE recipe_id = $4';
    client.query(sql, [req.body.name, req.body.ingredients, req.body.instructions, req.body.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/person', (req, res) => res.render('pages/person'))
  .get('/recipe', (req, res) => res.render('pages/recipe'))
  .use('/api/', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
