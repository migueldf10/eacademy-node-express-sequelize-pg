const express = require('express')
const router = express.Router()
const Course = require('../models').course
const Lesson = require('../models').lesson
const Permission = require('../models').permission
const jwtCheck = require('../middlewares/auth')


router.get('/', async function (req, res, next) {
	try {
		const allCourses = await Course.findAndCountAll({ include: [Lesson] })
		res.send(allCourses)
	} catch (e) {
		console.log(e)
	}
})

router.get('/:courseId', async function (req, res, next) {

	const id = req.params.id
	console.log(`We got a request for user id ${courseId}`)
	try {
		const selectedCourse = await Course.findByPk(courseId, { include: [Lesson], plain: true })
		res.send(selectedCourse)
	} catch (e) {
		console.log(e)
	}
})

router.put('/:courseId',jwtCheck, async function (req, res, next) {
	const isAdmin = req.user['https://thedutchonlineacademy.com/roles'].includes('admin')
	if(!isAdmin)return res.status(401).send('Not authorized')
	const courseId = req.params.courseId
	if(!courseId)return res.status(404).send('Not course')
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

module.exports = router