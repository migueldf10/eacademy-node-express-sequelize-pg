const express = require('express')
const app = express()
// Environment decides port when in Heroku
const port = process.env.PORT || 4000
const courseRoutes = require('./routes/courseRoutes')
const orderRoutes = require('./routes/orderRoutes')

// Middlewares for testing front end
const jsonParser = express.json();
const cors = require("cors");

app.use(jsonParser);
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.use('/course', courseRoutes)
app.use('/orders', orderRoutes)
