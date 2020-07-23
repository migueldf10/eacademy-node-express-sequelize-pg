const express = require('express')
const order = require('../models/order')
const router = express.Router()
const Order = require('../models').order
const Course = require('../models').course
const LineItem = require('../models').lineItem

router.post('/', async function (req, res, next) {
	// console.log(req.body)
	const {
		userId,
		courseIds,
		notes = '', } = req.body
	if (!userId || !courseIds || !courseIds.length > 0) {
		return res.status(401).send('sorry, you need to provide full order elements')
	}
	// Store promises without waiting on each
	const findCourses = async (courseId) => {
		return fetchedCourse = Course.findByPk(courseId)
	}
	const returnCourses = async () => {
		return Promise.all(courseIds.map(courseId => findCourses(courseId)))
	}
	const createLineItem = async (lineItemObject) => {
		return createdLineItem = LineItem.create(lineItemObject)
	}
	const createLineItems = async (lineItemsObjects) => {
		return Promise.all(lineItemsObjects.map(lineItemObject => createLineItem(lineItemObject)))
	}

	try {
		const dirtyCourses = await returnCourses()
		if (!dirtyCourses || dirtyCourses.includes(null)) {
			return res.status(401).send('Some IDS are not in the DB')
		}
		const courses = dirtyCourses.map(dirtyCourse => dirtyCourse.get({ plain: true }))
		const newOrder = await Order.create({
			userId,
			price: courses.reduce((a, b) => a + b.price, 0),
			notes,
			state: 'draft'
		})
		const lineItemsObjects = courses.map(course => ({
			orderId: newOrder.id,
			lineItemPrice: course.price,
			courseId: course.id
		}))
		const createdLineItems = await createLineItems(lineItemsObjects)
		const orderCreatedWithLineItems = await Order.findByPk(newOrder.id, { include: [LineItem] })
		return res.send(orderCreatedWithLineItems)
	} catch (e) {
		console.log('error', e)
		return res.status(500).send('something ocurred')
	}
})


router.put('/success', async function (req, res, next) {
	const { id } = req.body
	if (!id) {
		return res.status(401).send('provide an id')
	}
	try {
		const order = await Order.findByPk(id)

		if (!order) {
			return res.status(401).send('Order not found')
		}
		const updatedOrder = await order.update({ ...order, state: 'completed' })
		return res.send(updatedOrder)




	} catch (e) {
		console.log('error', e)
		return res.status(500).send('something ocurred')
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