import nodemailer from 'nodemailer'

export const sendEmail = async (req, res, next) => {
	console.log(req.body)

	const transporter = nodemailer.createTransport({
		service: 'outlook',
		auth: {
			user: process.env.FROM,
			pass: process.env.PASSWORD
		}
	})

	const mailOptions = {
		from: process.env.FROM,
		to: process.env.TO,
		subject: req.body.sender,
		html: `
			<h1>${req.body.sender}</h1>
			<h2>${req.body.email}</h2>
			<p>${req.body.message}</p>
		`
	}

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) console.log(error)
		else console.log('Email sent: ' + info.response)
	})
	res.sendStatus(200)
}
