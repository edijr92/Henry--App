const server = require('express').Router();
var nodemailer = require('nodemailer');
const {USER, PASS} = process.env;

server.post('/invitacion', (req, res) => {
	// Definimos el transporter
	console.log(req.body.email);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'henryappxd',
			pass: '123456henry',
		},
	});

	// Definimos el email
	var mailOptions = {
		from: 'Henrys app <henryappxd@gmail.com>',
		to: req.body.email,
		subject: 'invitacion a henry',
		text: 'este es el texto que va a ir en el mail',
	};
	// Enviamos el email
	transporter.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
			res.sendStatus(500);
		} else {
			console.log('Email sent');
			res.sendStatus(200);
		}
	});
});



server.post('/forgottenPassword', (req, res) => {
	// Definimos el transporter
	console.log(req.body.email);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'henrystoy123@gmail.com',
			pass: 'agusmarcosfrancomariano123',
		},
	});

	// Definimos el email
	var mailOptions = {
		from: 'Henrys toys <henrystoy123@gmail.com>',
		to: req.body.email,
		subject: 'Recuperar contraseña',
		text: 'Para resetear tu contraseña puedes ingresar a este link',
		html:
			'<span>Para obtener una nueva contraseña has click en el siguiente link</span> <a href="http://localhost:3000/recuperarContraseña">Resetear contraseña</a>',
	};
	// Enviamos el email
	transporter.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log(error);
			res.sendStatus(500);
		} else {
			console.log('Email sent');
			res.sendStatus(200);
		}
	});
});

module.exports = server;
