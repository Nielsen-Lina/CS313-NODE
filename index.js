const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client, defaults } = require('pg')
const connectionString = 'postgres://rcwxhvodpnbhvc:eb2aff81e7eff233ab9bdcbf90c66e03bce85894418592a2a1f5163e1664cbf4@ec2-54-235-193-0.compute-1.amazonaws.com:5432/d2k6pqiar0umjq'

defaults.ssl = true;
// const pool = new Pool({
//   connectionString: connectionString
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

let router = express.Router();
router.get('/getPerson/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT * FROM person WHERE id = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows[0]);
    });
  // });
});
router.get('/getParents/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT p.* FROM person p JOIN relationship ON child = p.id WHERE child = $1 LIMIT 1', [req.params.id], function(err, result) {
      console.log(result);
      client.end();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
});
router.get('/getChildren/:id', async function(req, res, next) {
  const client = new Client({
    connectionString: connectionString,
  })
  await client.connect()
    client.query('SELECT p.* FROM person p JOIN relationship ON parent = p.id WHERE parent = $1 LIMIT 1', [req.params.id], function(err, result) {
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
  .use('/api/', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
