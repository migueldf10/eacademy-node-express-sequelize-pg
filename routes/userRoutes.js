const express = require('express')
const order = require('../models/order')
const router = express.Router()
const Order = require('../models').order
const Course = require('../models').course
const Lesson = require('../models').lesson
const LineItem = require('../models').lineItem
const Permission = require('../models').permission
const CompletedLesson = require('../models').completedLesson
const TodoLesson = require('../models').todoLesson
const jwtCheck = require('../middlewares/auth')
const User = require('../models').user
const findOrCreateUser = require('../utils/findOrCreateUser')




// ********************************
// GET USER PROFILE
// ********************************

router.get('/', jwtCheck, async function (req, res, next) {
	console.log('Inside get endpoint from user, ')
	const authId = req.user.sub
	console.log('Auth id is', authId)

	if (!authId) {
		return res.status(401).send('sorry, you need to provide a user id')
	}

	console.log('request for user starting')
	// Action!
	try {

		console.log('request for inside promise')
		// const user = await User.findOrCreate({ where: { authId: authId }, plain: true, include: [Course, CompletedLesson, TodoLesson] })
		const user = await User.findOrCreate({
			where: { authId: authId },
			plain: true,
			include: [
				{
					model: Course,
					attributes: ['id', 'title'],
				},
				{
					model: TodoLesson,
					attributes: ['id', 'lessonId'],
					include: [{
						model: Lesson,
						attributes: ['title', 'courseId']
					}]

				},
				{
					model: CompletedLesson,
					attributes: ['id', 'lessonId'],
					include: [{
						model: Lesson,
						attributes: ['title', 'courseId']
					}]

				}
			]
		})
		console.log('We have  a response')
		return res.send(user[0])

	} catch (e) {
		console.log('Everything exploded')

		console.log('error', e)
		return res.status(500).send('something ocurred')
	}
})




module.exports = router