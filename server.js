import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { sendEmail } from './messageController.js'

// ENVIRONMENT
const production = process.env.NODE_ENV === 'production'
if (production) console.log('NODE_ENV:', process.env.NODE_ENV)
dotenv.config()

// EXPRESS
const app = express()
app.use(morgan('dev'))

app.use(cors({
	origin: [
		'http://localhost:5173',
		'https://jundran.github.io'
	]
}))
app.use(express.json())

// ROUTES
app.get('/api', (req, res) => res.json({ message: 'Welcome to the portfolio API' }))
app.post('/api/v1/message', sendEmail)

// CATCH 404
app.use((req, res, next) => {
	res.status(501)
	res.json({ message: 'API route does not exist' })
})

// ERROR HANDLER
app.use(async (err, req, res, next) => {
		console.error('EXPRESS ERROR', err)
		res.sendStatus(500)
})

const port = 6001
app.listen(port, () => console.log(`App listening on port ${port}`))
