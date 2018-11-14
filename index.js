const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
function calculate(req) {
var operand1 = +(req.query.operand1);
	var operand2 = +(req.query.operand2);
	var result;
	switch(req.query.operation) {
	case "+":
	result = operand1 + operand2;
	break;
	case "-":
	result = operand1 - operand2;
	break;
	case "*":
	result = operand1 * operand2;
	break;
	case "/":
	result = operand1 / operand2;
	break;
	}
	return result;
}
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/calc', (req, res) => res.render('pages/math'))
  .get('/math_service', (req, res) => {
	var result = calculate(req)
  res.json({result:result})	
  })
  .get('/math', (req, res) => {
	var result = calculate(req)
  res.render('pages/results',{result:result})
  })
  
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
