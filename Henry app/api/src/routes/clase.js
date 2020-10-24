const server = require("express").Router();
const { Clase } = require("../db");


//crea una clase
server.post("/", (req, res, next) => {
    Clase.create({
        modulo: req.body.modulo,
        clase: req.body.clase,
        link: req.body.link,
    }).then(clase => res.send(clase))
        .catch(err => {
            console.log(err)
            next(err)
        })
})
//trae el modulo
server.get("/:modulo", (req, res, next) => {
    Clase.findAll({
        where: {
            modulo: req.params.modulo,
            // cohorteId: req.params.cohorte
        },
    }).then(clase => res.json(clase))
        .catch(err => next(err));
});

module.exports = server;
