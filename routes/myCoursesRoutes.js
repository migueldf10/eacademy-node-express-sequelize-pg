const express = require('express')
const router = express.Router()
const Course = require('../models').course
const User = require('../models').user
const Lesson = require('../models').lesson
const jwtCheck = require('../middlewares/auth')
const Permission = require('../models').permission




router.get('/:myCourseId', jwtCheck, async function (req, res, next) {
	const authId = req.user.sub

	const myCourseId = parseInt(req.params.myCourseId)

	if (!myCourseId || isNaN(myCourseId)) { return res.status(401).send('Not purchased...') }

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

		// DOES USER HAVE PERMISSIONS TO SEE THIS COURSE?
		const coursesIds = user.permissions.map(permission => permission.courseId)
		if (!coursesIds.includes(myCourseId)) {
			return res.status(401).send('Not permissions...')
		}

		const selectedCourse = await Course.findByPk(myCourseId, {
			include: [{
				model: Lesson,
				attributes: ['id', 'title']
			}],
			plain: true
		})

		res.send(selectedCourse)
	} catch (e) {
		console.log(e)
	}
})


module.exports = router