const server = require('express').Router();
const {Usuario} = require ('../db.js')
const passport = require('passport');
const crypto = require("crypto");
//crear usuario
//http://localhost:3006/user/
server.post('/', async(req, res, next) => {
		const salt = crypto.randomBytes(64).toString("hex");
		try {
			const {email, password,apellido,nombre, rol,proceso, active, pairId, grupoId, cohorteId,localidad,edad, image} = req.body;
			const passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("base64");
			 const user = await Usuario.update({
				nombre,
				apellido,
				password: passwordHash,
				rol: "alumno",
				proceso: "1",
				salt,
				active,
				pairId,
				cohorteId,
				grupoId,
				localidad,
				edad,
				image
			},
			{where : {email}}
			);
			 if (user) {
				passport.authenticate("local", function (err, user, info) {
					if (err) {
						return next(err);
					}
					if (!user) {
						return res.status(401).json({ status: "error", message: info.message });
					}
					req.login(user, function (err) {
						if (err) {
							return next(err);
						}
						return res.json({ status: "ok", user: req.user, isAuth: req.isAuthenticated() });
					});
				})(req, res, next);
			}
		} catch (err) {
			console.log({ err });
			return res.status(500).json({ status: "error", message: "Error, el email ya existe.", input: "email", err });
		}
});
//login de un usuario
server.post("/login", async (req, res, next) =>{
	if(req.isAuthenticated()) return res.json({ status: "ok", user: req.user, isAuth: true });
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ status: "error", message: info.message, input: info.input });
		}
		req.login(user, function (err) {
			if (err) {
				return next(err);
			}
			console.log(req.session)
			return res.json({ status: "ok", user, isAuth: req.isAuthenticated() });
		});
	})(req, res, next);
});

//deslogueo de un usuario
server.get('/logout', (req, res) =>{
	req.logout();
	req.session.destroy();
	res.sendStatus(200);
})
//actualiza el rol de un usuario
server.put('/:id/rol', (req, res, next) => {
    const { id } = req.params;
    const { rol} = req.body;
    Usuario.update(
        {
		rol
		},
        { where: { id } }
    ).then((usuario) => {
        res.status(200).send(usuario);
    }).catch(next);
});
//actualiza informacion del usuario
server.put('/update/:id', (req, res) => {
	var newEmail = req.body.email;
	var {edad,localidad,nombre, apellido, image} = req.body;
	console.log(req.body);
	Usuario.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then(user => {
			user.update({
				nombre: nombre,
				apellido: apellido,
				email: newEmail,
				localidad: localidad,
				edad: edad,
				image
			});
			res.status(200).send(user);
		})
		.catch(err => {
			res.send('Usuario inexistente');
		});
});

//cambio de password
server.put('/repassword', (req, res, next) =>{
	const passwordHash = crypto.pbkdf2Sync(req.body.password, req.user.salt, 10000, 64, "sha512").toString("base64");
	if(passwordHash !== req.user.password) return res.sendStatus(401);
	const newSalt = crypto.randomBytes(64).toString("hex");
	const newPasswordHash = crypto.pbkdf2Sync(req.body.newPass, newSalt, 10000, 64, "sha512").toString("base64");
	Usuario.update({
		password: newPasswordHash,
		salt: newSalt
	},{ where:{ id: req.user.id } })
		.then(usuario  => res.json(usuario))
		.catch(err => next(err));
})
//borra usuario
server.put('/:id/delete', (req,res)=>{
	const id= req.params.id
	Usuario.update({
		active: false
	}, {where:{
		id: id
	}}).then(response=>{
		res.send(response)
	}).catch(response=>{
		res.send(response)
	})
})
server.get("/me", (req, res, next) =>{
	if(!req.isAuthenticated()) return res.sendStatus(401);
	res.json(req.user);
})

module.exports = server;