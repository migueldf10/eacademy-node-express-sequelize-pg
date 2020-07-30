const express = require('express')
const router = express.Router()
const Course = require('../models').course
const User = require('../models').user
const Lesson = require('../models').lesson
const jwtCheck = require('../middlewares/auth')
const Permission = require('../models').permission




router.get('/:lessonId', jwtCheck, async function (req, res, next) {
	const authId = req.user.sub

	const lessonId = parseInt(req.params.lessonId)

	if (!lessonId || isNaN(lessonId)) { return res.status(401).send('Not valid lesson...') }

	try {
		const user = await User.findOne({
			where: { authId: authId },
			plain: true,
			include: [
				{
					model: Permission,
					attributes: ['courseId'],

				},
			],
			attributes: ['id'],
		})
		// IS USER IN DATABASE?
		if (!user) {
			return res.status(401).send('Not activity...')
		}

		const selectedLesson = await Lesson.findByPk(lessonId, {
			plain: true
		})


		// DOES USER HAVE PERMISSIONS TO SEE THIS COURSE?
		const coursesIds = user.permissions.map(permission => permission.courseId)
		if (!coursesIds.includes(selectedLesson.courseId)) {
			return res.status(401).send('Not permissions...')
		}


		res.send(selectedLesson)
	} catch (e) {
		console.log(e)
	}
})


module.exports = router 