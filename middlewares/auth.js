var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-u490adjs.eu.auth0.com/.well-known/jwks.json'
	}),
	issuer: 'https://dev-u490adjs.eu.auth0.com/',
	algorithms: ['RS256']
});


module.exports = jwtCheck
