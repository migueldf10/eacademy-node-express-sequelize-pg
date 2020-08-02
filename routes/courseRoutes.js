const express = require('express')
const router = express.Router()
const Course = require('../models').course
const Lesson = require('../models').lesson
const Permission = require('../models').permission


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


module.exports = router