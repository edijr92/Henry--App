const server = require("express").Router();
const {Feedback} = require("../db");

//crea un feedback
server.post("/nuevo", (req, res, next) => {
    Feedback.create({
        social_skills: req.body.social_skills, 
        tecnical_skills: req.body.tecnical_skills,
        comentarios: req.body.comentarios,
        alumnoId: req.body.alumnoId,
        autorId: req.body.autorId
    }).then(feedback => res.json(feedback))
        .catch(err => next(err));
})

//trae feedbacks de todos los alumnos
server.get("/:id", (req, res, next) =>{
    Feedback.findAll({
        where : {alumnoId: req.params.id}
    })
        .then(user => res.json(user))
        .catch(err => next(err));
})

module.exports = server;
