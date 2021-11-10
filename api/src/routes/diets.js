const { Router } = require('express');
const { Diets } = require('../db');
const axios = require('axios')
const {
    API_KEY1,
    API_KEY2,
    API_KEY3,
    API_KEY4
  } = process.env;
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/types', async (req, res, next) => {
    
        return Diets.findAll()
        .then((diet) => {
            res.send(diet)
        })
        .catch((error) => {
            next(error)
        })
})

router.post('/', async (req, res, next) => {
    try {
        const {name} = req.body;
        const newDiet = await Diets.create({
            name,
        })
        res.send(newDiet)
    } catch (error) {
        next(error)
    }
})

router.delete('/', async(req, res, next) => {
    const {name} = req.body;
    try {
        await Diets.destroy({
            where: {
                name: name
            }
        })
        res.send(`Receta ${name} eliminada con éxito`)
    } catch (error) {
        next(error)        
    }
})


module.exports = router;
