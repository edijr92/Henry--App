const server = require("express").Router();
const {Usuario, Cohorte, Grupo} = require("../db");
const {Op, literal} = require("sequelize");
var nodemailer = require('nodemailer');
const {USER, PASS} = process.env;
//get de todos los alumnos
server.get("/", (req, res, next) =>{
    Usuario.findAll({
        attributes:{
            exclude:["password", "provider", "providerId", "salt", "rol", "createdAt", "updatedAt", "pairId","image" ]
        },
        where:{
            rol: "alumno"
        }
    }).then(alumnos => res.json(alumnos))
      .catch(err => next(err));
})
//get de todos los alumnos de un cohorte
server.get("/cohorte/:cohorte", (req, res, next) =>{
    Usuario.findAll({
        where:{
            rol: "alumno",
            "$cohorte.id$": req.params.cohorte
        },
        include:{
            model: Cohorte,
            as: "cohorte"
        }
    }).then(usuario => res.json(usuario))
        .catch(err => next(err));
});
//trae alumnos de un grupo pm
server.get("/pm/:pm", async(req, res, next) =>{
    const pm = await Usuario.findOne({
        where:{ nombre: req.params.pm }
    })
    Grupo.findOne({
        where:{
            id: pm.grupoId,
            "$usuarios.id$":{[Op.not]:pm.id}
        },
        include:{
        model: Usuario,
        as: "usuarios"
        }
    }).then(grupo =>{
        res.json(grupo.usuarios);
    })
    .catch(err => next(err));
});
//actualiza los grupos de un alumno
server.put("/editar", (req, res, next) =>{
    console.log(req.body);
    Usuario.findByPk(req.body.usuarioId)
.then(usuario => {usuario.grupoId = req.body.grupoId;
    usuario.cohorteId = req.body.cohorteId
return usuario.save()
}).then(usuario => res.json(usuario))
    .catch(err => next(err));
})
server.get("/notas" , (req, res, next) => {
    Usuario.findAll({
        attributes:[
            "id",
            "nombre",
            "apellido",
            [literal(`(SELECT nota FROM nota WHERE modulo='M1' AND "evaluadoId"=usuario.id)`),"M1"],
            [literal(`(SELECT nota FROM nota WHERE modulo='M2' AND "evaluadoId"=usuario.id)`),"M2"],
            [literal(`(SELECT nota FROM nota WHERE modulo='M3' AND "evaluadoId"=usuario.id)`),"M3"],
            [literal(`(SELECT nota FROM nota WHERE modulo='M4' AND "evaluadoId"=usuario.id)`),"M4"],
        ]
    })
        .then(usuarios => res.json(usuarios))
        .catch(err => next(err))
})
//actualiza el cohorte de un alumno
/* server.put("/cohorte/agregar", (req, res, next) => {
    Usuario.findByPk(req.body.usuarioId)
    .then(usuario => {
        usuario.cohorteId = req.body.cohorteId;
        return usuario.save();
    }).then(usuario => res.json(usuario))
        .catch(err => next(err));
}) */
//crea un usuario con solo email
server.post('/agregar', (req, res, next) => {
    const addEmails = req.body.emails.map(email => {
       	var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'henryappxd@gmail.com',
                pass: '123456henry',
            },
	    });
        // Definimos el email
        var mailOptions = {
            from: 'Henrys app <henryappxd@gmail.com>',
            to: email,
            subject: 'invitacion a henry',
            text: 'Tu aplicación a Henry fue exitosa, por favor termina tu registro con el MISMO email que aplicaste en henry por el siguiente link:http://localhost:3000/registrarse',
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent');
            }
        });
        return Usuario.create({
            email: email,
            rol: 'alumno',
            active: true,
            cohorteId: req.body.cohorteId
        })
    })
    Promise.all(addEmails).then(() => res.send('OK'))
    .catch( err => next(err))
})
//trae todos los grupos pm de un cohorte
server.get ("/grupopm/:cohorte", (req,res,next) => {
    Grupo.findAll({
        where : {
            "$cohorte.id$": req.params.cohorte
        },
        include: {
            model : Cohorte,
            as : "cohorte"
        }
    }).then(grupo => res.json(grupo))
    .catch(err => next(err))
})
//actualiza grupo pp de un alumno
server.put("/pair/agregar", (req, res, next) =>{
    Usuario.findByPk(req.body.usuarioId)
.then(usuario => {usuario.pairId = req.body.pairId;
return usuario.save()
}).then(usuario => res.json(usuario))
    .catch(err => next(err));
})

module.exports = server;