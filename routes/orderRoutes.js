const express = require('express')
const router = express.Router()
const Order = require('../models').order


router.post('/', async function (req, res, next) {

	const { userId,
		courseIds } = req.body

	if (!userId || !price) {
		res.status(401).send('sorry, you need to provide full order elements')
	}
	const newOrder = {
		userId,
		price,
		notes,
		state: 'draft'
	}
	try {
		const newOrder = await Order.create({ include: [Lesson] })
		res.send(newOrder)
	} catch (e) {
		console.log(e)
	}
})

router.get('/:id', async function (req, res, next) {

	const id = req.params.id
	console.log(`We got a request for user id ${id}`)
	try {
		const selectedCourse = await Course.findByPk(id, { include: [Lesson], plain: true })
		res.send(selectedCourse)
	} catch (e) {
		console.log(e)
	}
})


module.exports = router