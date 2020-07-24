const express = require('express')
const order = require('../models/order')
const router = express.Router()
const Order = require('../models').order
const Course = require('../models').course
const LineItem = require('../models').lineItem
const Permission = require('../models').permission
const jwtCheck = require('../middlewares/auth')
const User = require('../models').user



router.post('/', jwtCheck, async function (req, res, next) {
	console.log('enters the query', req.body)
	// console.log(req.body)
	const userId = req.user.sub
	const {
		cart,
		notes = '', } = req.body

	if (!userId || !cart || !cart.length > 0) {
		return res.status(401).send('sorry, you need to provide full order elements')
	}
	// Store promises without waiting on each
	const findCourses = async (courseId) => {
		return fetchedCourse = Course.findByPk(courseId)
	}
	const returnCourses = async () => {
		return Promise.all(cart.map(product => findCourses(product.id)))
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
	const createPermission = async (courseId, userId, orderId) => {
		return Permission.create({
			userId,
			courseId: courseId,
			orderId
		})
	}
	const mapLineItemsToPermissions = async (lineItems, userId, orderId) => {
		return Promise.all(lineItems.map(lineItem => createPermission(lineItem.courseId, userId, orderId)))
	}
	try {
		const order = await Order.findByPk(id, { include: [LineItem] })

		if (!order) {
			return res.status(401).send('Order not found')
		}
		const updatedOrder = await order.update({ ...order, state: 'completed' })
		const plainOrder = await updatedOrder.get({ plain: true })
		const permissions = await mapLineItemsToPermissions(plainOrder.lineItems, plainOrder.userId, plainOrder.id)

		const orderWithPermissions = await Order.findByPk(id, { include: [Permission] })
		return res.send(orderWithPermissions)

	} catch (e) {
		console.log('error', e)
		return res.status(500).send('something ocurred')
	}
})


router.get('/:id', async function (req, res, next) {
	const { id } = req.params

	try {
		const selectedOrder = await Order.findByPk(id, { include: [LineItem], plain: true })

		if (!selectedOrder) {
			return res.status(404).send('order not found')
		}
		res.send(selectedOrder)
	} catch (e) {
		console.log(e)
	}
})

module.exports = router