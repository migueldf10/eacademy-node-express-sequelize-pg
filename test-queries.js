const User = require('./models').user
const Course = require('./models').course
const Lesson = require('./models').lesson
const CompletedLesson = require('./models').completedLesson
const TodoLesson = require('./models').todoLesson
const Order = require('./models').order
const Permission = require('./models').permission
const LineItem = require('./models').lineItem



const displayUserByAuthId = async (authId) => {
	const user = await User.findOrCreate({ where: { authId: authId }, plain: true, include: [Course, CompletedLesson, TodoLesson, Order] })
	return console.log(user)
}



// displayUserByAuthId('auth0|5f1824bc35b4680013aeb429')


// ***********************


const displayUserWithTodoLessons = async (authId) => {
	const user = await User.findOrCreate({ where: { authId: authId }, plain: true, include: [{ model: Course, include: [{ model: Lesson, include: [CompletedLesson, TodoLesson] }] }] })
	return console.log(user)
}



displayUserWithTodoLessons('auth0|5f1824bc35b4680013aeb429')


// ***********************

const displayUsers = async () => {
	const users = await User.findAll({ include: [Course, CompletedLesson, TodoLesson, Order] })
	const usersClean = users.map((user) => console.log(user.get({ plain: true })))
	return usersClean
}
// displayUsers()


// ***********************

const displayCoursesToUser = async () => {
	const users = await User.findAll({ include: [Course] })
	const usersClean = users.map((user) => console.log(user.get({ plain: true })))
	return usersClean
}
// displayCoursesToUser()

// ***********************

const displayCourse = async () => {
	const courses = await Course.findAll({ include: [Lesson] })
	const coursesClean = courses.map((course) => console.log(course.get({ plain: true })))
	return coursesClean
}
// displayCourse()

// ***********************


const displayOrdersWithLineItems = async () => {
	const orders = await Order.findAll({ include: [LineItem] })
	const ordersClean = orders.map((order) => console.log(order.get({ plain: true })))
	return ordersClean
}
// displayOrdersWithLineItems()

// ***********************


const displayPermissionsWithOrders = async () => {
	const permissions = await Permission.findAll({ include: [Order] })
	const permissionsClean = permissions.map((permission) => console.log(permission.get({ plain: true })))
	return permissionsClean
}
// displayPermissionsWithOrders()

// ***********************


const displayCoursesWithLineItems = async () => {
	const courses = await Course.findAll({ include: [LineItem] })
	const coursesClean = courses.map((course) => console.log(course.get({ plain: true })))
	return coursesClean
}

// displayCoursesWithLineItems()

// ***********************

const displayCoursesWithOrders = async () => {
	const courses = await Course.findAll({ include: [{ model: LineItem, include: [Order] }] })
	const coursesClean = courses.map((course) => console.log(course.get({ plain: true })))
	return coursesClean
}
// displayCoursesWithOrders()

// ***********************


const displayOrdersWithCourseId = async (courseId) => {
	const orders = await Order.findAll(
		{
			include: [
				{
					model: LineItem,
					where: { courseId: courseId }
				}
			],
		})

	const ordersClean = orders.map((order) => console.log(order.get({ plain: true })))
	return ordersClean
	// const course = await Course.findByPk(courseId, { include: [{ model: LineItem, include: [Order] }] })
	// const coursesClean = course.get({ plain: true })
	// return console.log(coursesClean)
}
// displayOrdersWithCourseId(1)

// ***********************
