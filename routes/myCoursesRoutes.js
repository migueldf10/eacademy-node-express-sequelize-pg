const express = require('express')
const router = express.Router()
const Course = require('../models').course
const Lesson = require('../models').lesson
const jwtCheck = require('../middlewares/auth')




router.get('/:id', jwtCheck, async function (req, res, next) {

	const id = req.params.id
	try {
		const selectedCourse = await Course.findByPk(id, { include: [Lesson], plain: true })
		res.send(selectedCourse)
	} catch (e) {
		console.log(e)
	}
})


module.exports = router