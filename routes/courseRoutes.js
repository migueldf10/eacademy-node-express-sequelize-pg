const express = require('express')
const router = express.Router()
const Course = require('../models').course
const Lesson = require('../models').lesson
const Permission = require('../models').permission
const Order = require('../models').order
const jwtCheck = require('../middlewares/auth')
const findOrCreateUser = require('../utils/findOrCreateUser')


router.get('/', async function (req, res, next) {
	try {
		const allCourses = await Course.findAndCountAll({ include: [Lesson] })
		res.send(allCourses)
	} catch (e) {
		console.log(e)
	}
})

router.get('/:courseId', async function (req, res, next) {

	try {
		const selectedCourse = await Course.findByPk(courseId, { include: [Lesson], plain: true })
		res.send(selectedCourse)
	} catch (e) {
		console.log(e)
	}
})

router.put('/:courseId', jwtCheck, async function (req, res, next) {
	const isAdmin = req.user['https://thedutchonlineacademy.com/roles'].includes('admin')
	if (!isAdmin) return res.status(401).send('Not authorized')
	const courseId = req.params.courseId
	if (!courseId) return res.status(404).send('Not course')
	const newCourse = req.body
	try {
		const selectedCourse = await Course.findByPk(courseId, { include: [Lesson], plain: true })
		selectedCourse.title = newCourse.title || selectedCourse.title
		selectedCourse.description = newCourse.description || selectedCourse.price
		selectedCourse.price = newCourse.price || selectedCourse.description
		selectedCourse.videoUrl = newCourse.videoUrl || selectedCourse.videoUrl

		const savedCourse = await selectedCourse.save()
		res.send(savedCourse)
	} catch (e) {
		console.log(e)
	}
})


router.post('/', jwtCheck, async function (req, res, next) {
	const isAdmin = req.user['https://thedutchonlineacademy.com/roles'].includes('admin')
	if (!isAdmin) return res.status(401).send('Not authorized')

	const authId = req.user.sub
	const user = await findOrCreateUser(authId)

	const newCourse = req.body

	try {
		const courseCreated = await Course.create({ ...newCourse, published: false })
		if (!courseCreated) return res.status(500).send('The served mess up')
		const orderCreated = await Order.create({
			userId: user.id,
			price: 1,
			notes: 'Admin creating a course',
			state: 'test'
		})
		if (!orderCreated) return res.status(500).send('The served mess up')

		const createdPermissions = await Permission.create({
			userId: user.id,
			courseId: courseCreated.id,
			orderId: orderCreated.id
		})
		res.send(courseCreated)
	} catch (e) {
		console.log(e)
	}
})

module.exports = router