const express = require('express')
const router = express.Router()
const Course = require('../models').course
const User = require('../models').user
const Lesson = require('../models').lesson
const jwtCheck = require('../middlewares/auth')
const Permission = require('../models').permission
const CompletedLesson = require('../models').completedLesson
const TodoLesson = require('../models').todoLesson




router.put('/toggleLessonDone/:lessonId', jwtCheck, async function (req, res, next) {
	const authId = req.user.sub
	const { set } = req.body
	console.log('set', set)
	const lessonId = parseInt(req.params.lessonId)

	if (!lessonId || isNaN(lessonId)) { return res.status(401).send('Not valid lesson...') }

	// Promise Creators
	const deleteTodo = async (todo) => {
		return todo.destroy()
	}
	const mapExistingTodos = async (todos) => {
		return Promise.all(todos.map(todo => deleteTodo(todo)))
	}

	try {
		const user = await User.findOne({
			where: { authId: authId },
			include: [
				{
					model: Permission,
					attributes: ['courseId'],
				},
				{
					model: TodoLesson,
					attributes: ['id', 'lessonId'],
				},
			],
			attributes: ['id'],
		})

		// IS USER IN DATABASE?
		if (!user) {
			return res.status(401).send('Not activity...')
		}

		const selectedLesson = await Lesson.findByPk(lessonId)



		// DOES USER HAVE PERMISSIONS TO SEE THIS LESSON?
		const coursesIdsPermitted = user.permissions.map(permission => permission.courseId)
		if (!coursesIdsPermitted.includes(selectedLesson.courseId)) {
			return res.status(401).send('Not permissions...')
		}

		// Is the lesson in the already todo list?
		const todoLessonsItem = user.todoLessons.find(todoItem => todoItem.lessonId === lessonId)

		if (set === false) {
			const todoItemInDb = await TodoLesson.findAll({
				where: {
					userId: user.id,
					lessonId: lessonId
				}
			})
			if (todoItemInDb) {
				await mapExistingTodos(todoItemInDb)
				return res.send({ state: 'sucess' })
			}
		}

		// If you want to set it true, but already exists, it means we have an error, so remove all of them and create a new one seems doable.



		const todoItemInDb = await TodoLesson.create({
			userId: user.id,
			lessonId: lessonId
		})
		res.send(todoItemInDb)
	} catch (e) {
		console.log(e)
	}
})


module.exports = router 