const User = require('./models').user
const Course = require('./models').course

const displayUsers = async () => {
	const users = await User.findAll({ include: [Course] })
	const usersClean = users.map((user) => console.log(user.get({ plain: true })))
	return usersClean
}

// displayUsers()