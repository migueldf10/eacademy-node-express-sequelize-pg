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

router.post('/', jwtCheck, async function (req, res, next) {
	const isAdmin = req.user['https://thedutchonlineacademy.com/roles'].includes('admin')
	if (!isAdmin) return res.status(401).send('Not authorized')

	const { courseId, title } = req.body
	if (!courseId || !title) return res.status(400).send('missing elements')
	try {
		const newLeson = await Lesson.create({ ...req.body, published: false, priority: 1 })
		res.send(newLeson)
	} catch (e) {
		console.log(e)
	}
})

router.put('/:lessonId', jwtCheck, async function (req, res, next) {
	const isAdmin = req.user['https://thedutchonlineacademy.com/roles'].includes('admin')
	if (!isAdmin) return res.status(401).send('Not authorized')

	const lessonId = req.params.lessonId
	if (!lessonId) return res.status(404).send('Not lesson')

	const newLesson = req.body

	try {
		const selectedLesson = await Lesson.findByPk(lessonId)
		selectedLesson.title = newLesson.title || selectedLesson.title
		selectedLesson.description = newLesson.description || selectedLesson.description
		selectedLesson.videoUrl = newLesson.videoUrl || selectedLesson.videoUrl
		const savedLesson = await selectedLesson.save()
		res.send(savedLesson)
	} catch (e) {
		console.log(e)
	}
})




module.exports = router 