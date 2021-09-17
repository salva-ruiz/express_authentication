/*
 * server.js
 */

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.send('Congratulations: the server is running!')
})

app.get('/private', (req, res) => {
	if (req.signedCookies.token == 'xxx') {
		res.send('You have logged!')
	} else {
		res.sendStatus(403)
	}
})

app.post('/login', (req, res) => {
	if (req.body.username == process.env.USERNAME
	    && req.body.password == process.env.PASSWORD) {
		res.cookie('token', 'xxx', {
			signed: true, 
			maxAge: process.env.COOKIE_EXPIRATION
		})
		res.json({
			status: 'ok',
			username: req.body.username
		})
	} else {
		res.sendStatus(401)
	}
})

app.post('/logout', (req, res) => {
	res.clearCookie('token')
	res.send('You have disconnected.')
})

app.listen(process.env.SERVER_PORT, () => {
	console.log('Server running at http://localhost:%s',
		process.env.SERVER_PORT)
})
