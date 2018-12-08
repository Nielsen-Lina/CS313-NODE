const { Pool, Client, defaults } = require('pg')
const connectionString = 'postgres://rcwxhvodpnbhvc:eb2aff81e7eff233ab9bdcbf90c66e03bce85894418592a2a1f5163e1664cbf4@ec2-54-235-193-0.compute-1.amazonaws.com:5432/d2k6pqiar0umjq'
defaults.ssl = true

module.exports = {
	getDetails: async function(req, res, next) {
	 const client = new Client({
	   connectionString: connectionString,
	 })
	 await client.connect()
	   client.query("SELECT * FROM recipe WHERE recipe_id = $1 LIMIT 1", [req.params.id], function(err, result) {
	     console.log(result);
	     client.end();
	     if (err) {
	       return console.error("error running query", err);
	     }
	     res.send(result.rows[0]);
	   });
	},

	addRecipe: async function(req, res, next) {
	  const client = new Client({
	    connectionString: connectionString,
	  })
	  await client.connect()
	  	var sql = 'INSERT INTO recipe(recipe_name, ingredients, instructions) VALUES($1, $2, $3)';
	    client.query(sql, [req.body.name, req.body.ingredients, req.body.instructions], function(err, result) {
	      client.end();
	      if (err) {
	        return console.error('error running query', err);
	      }
	      res.redirect('../app')
	    });
	},

	deleteRecipe: async function(req, res, next) {
	  const client = new Client({
	    connectionString: connectionString,
	  })
	  await client.connect()
	  	var sql = 'DELETE FROM recipe WHERE recipe_id = $1';
	    client.query(sql, [req.params.id], function(err, result) {
	      client.end();
	      if (err) {
	        return console.error('error running query', err);
	      }
	      res.send(200);
	    });
	},

	editRecipe: async function(req, res, next) {
	  const client = new Client({
	    connectionString: connectionString,
	  })
	  await client.connect()
	  	var sql = 'UPDATE recipe SET recipe_name = $1, ingredients = $2, instructions = $3 WHERE recipe_id = $4';
	    client.query(sql, [req.body.name, req.body.ingredients, req.body.instructions, req.body.id], function(err, result) {
	      client.end();
	      if (err) {
	        return console.error('error running query', err);
	      }
	      res.redirect('../app')
	    });
	},

	getAllRecipes: async function (req,res){
  	const client = new Client({
    	connectionString: connectionString,
  	})
  	await client.connect()
  		client.query('SELECT * FROM recipe', function(err, result){
  			if(err) {
  				return console.error('error runing query', err)
  			}
  			res.render('pages/app', {recipe: result.rows})
  			client.end()
  		})
  }
}