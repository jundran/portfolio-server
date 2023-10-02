import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { sendEmail } from './messageController.js'

// ENVIRONMENT
const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) console.log('NODE_ENV:', process.env.NODE_ENV)
dotenv.config()

// EXPRESS
const app = express()
app.use(morgan('dev'))

app.use(cors({
	credentials: true,
	origin: isProduction ? [
		'https://jundran.github.io',
		'https://next-example-production.up.railway.app',
		'https://next-example-one-mauve.vercel.app'
	] : true
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
