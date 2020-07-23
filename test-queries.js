const User = require('./models').user
const Course = require('./models').course
const Lesson = require('./models').lesson
const CompletedLesson = require('./models').completedLesson
const TodoLesson = require('./models').todoLesson

const displayUsers = async () => {
	const users = await User.findAll({ include: [Course, CompletedLesson, TodoLesson] })
	const usersClean = users.map((user) => console.log(user.get({ plain: true })))
	return usersClean
}
displayUsers()

const displayCourse = async () => {
	const courses = await Course.findAll({ include: [Lesson] })
	const coursesClean = courses.map((course) => console.log(course.get({ plain: true })))
	return coursesClean
}

// displayCourse()


