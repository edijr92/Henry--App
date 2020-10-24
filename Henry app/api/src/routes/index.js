const { Router } = require('express');
// import all routers;
const alumnosRouter = require('./alumnos.js');
const gruposRouter = require('./grupos.js');
const cohortesRouter = require('./cohortes.js');
const claseRouter = require ("./clase.js")
const registroRouter = require ('./Registro.js')
const procesoRouter = require ('./Proceso.js')
const pairRouter = require ('./PairPrograming')
const feedbackRouter = require ("./feedbackroutes")
const notasRouter = require("./notas")
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use ("/pair", pairRouter)
router.use ("/clase", claseRouter)
router.use ('/user', registroRouter);
router.use ('/proceso', procesoRouter);
router.use('/alumnos', alumnosRouter);
router.use('/grupos', gruposRouter);
router.use('/cohortes', cohortesRouter);
router.use ("/feedback",feedbackRouter)
router.use ("/notas",notasRouter)

module.exports = router;
