const express = require('express')
const jwtCheck = require('./middlewares/auth')

const port = process.env.PORT || 4000

// Routes
const courseRoutes = require('./routes/courseRoutes')
const orderRoutes = require('./routes/orderRoutes')


const app = express()
// Middlewares for testing front end

const jsonParser = express.json();
app.use(jsonParser);
const cors = require("cors");
app.use(cors());






app.get('/authorized', jwtCheck, function (req, res) {
	console.log('it works')
	console.log('all info', req.user.sub)
	res.send('Secured Resource');
});



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.use('/course', courseRoutes)
app.use('/orders', orderRoutes)
