const server = require('express').Router();
const {Usuario, Notas} = require ('../db.js')

//actualiza el proceso de un alumno
server.post ('/:id/proceso', (req,res,next) => {
    const id = req.params.id
    const nota = req.body.nota
    const autor = req.body.autor
    Notas.create({
        usuarioId: id,
        valor: nota,
        autor: autor,
    }).then(res=>{
        if(nota>7 && autor == 'checkpoint'){
            Usuario.increment(['proceso'], { by: 1, where: { id: id, proceso : {[Op.lt]: 4}}});
        } 
    }).then(response=>{
        res.send(response)
    }).catch(err=>{res.send(err)})
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
module.exports = server;