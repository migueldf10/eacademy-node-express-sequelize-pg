const User = require('../models').user

const findOrCreateUser = async (authId) => {
	const userInDb = await User.findOrCreate({ where: { authId: authId }, raw: true })
	// Since we use find or create, userInDb has this shape [object,isCreatedNow]
	return userInDb[0]
}

module.exports = findOrCreateUser