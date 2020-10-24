const server = require("express").Router();
const {Pair, Usuario} = require("../db");
const { route } = require("./grupos");

//crea un grupo de pair programming
server.post("/grupo", (req, res, next) =>{
    Pair.create({
        alumnos: req.body.alumnos,
        cohorteId: req.body.cohorteId,
        grupoId: req.body.grupoId
    }).then(pair => res.json(pair))
        .catch(err => next(err));
});
server.post("/random", async(req, res, next) =>{
    try{
        const {rows, count} = await Usuario.findAndCountAll({
            where:{
                grupoId: req.body.grupoId,
                pairId: null
            }
        });
        const grupos = Math.round(count / 6);
        let pairs = [];
        for(let i=1; i<=grupos;i++){
            const pair = await Pair.create({
                alumnos: 0,
                cohorteId: req.body.cohorteId,
                grupoId: req.body.grupoId
            });
            pairs.push(pair);
        }
        const usuarios = rows.map(async (usuario) => {
            pairs = pairs.filter(pair => pair.alumnos < 6);
            let rndPair = Math.floor(Math.random() * (pairs[pairs.length -1].id - pairs[0].id)) + pairs[0].id;
            usuario.pairId = rndPair;
            let indexPair = pairs.findIndex(pair => pair.id === rndPair);
            pairs[indexPair].alumnos++;
            await pairs[indexPair].save();
            return await usuario.save();
        })
        const values = await Promise.all(usuarios);
        res.json(values);
    }catch(err){
        next(err);
    }
})
//trae los alumnos del grupo de pairprogramming
server.get("/", (req, res, next) =>{
    Pair.findOne({
        where:{
            id: req.user.pairId
        },
        include:{
            model:Usuario,
            as: "usuarios"
        }
    }).then(pair => res.json(pair.usuarios))
        .catch(err => next(err));
});
//trae todos los grupos de pair
server.get("/cohorte/:cohorteId/grupo/:grupoId", (req, res, next) =>{
    Pair.findAll({
        
        where:{
            cohorteId: req.params.cohorteId,
            grupoId: req.params.grupoId
        },
        include:{
            model:Usuario,
            as: "usuarios"
        }
    })
        .then(pair => res.json(pair))
        .catch(err => next(err));
})





module.exports = server;