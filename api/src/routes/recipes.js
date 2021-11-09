const { Router } = require('express');
const { Recipes, Diets } = require('../db');
const axios = require('axios')
const router = Router();
const {
    API_KEY1,
    API_KEY2,
    API_KEY3,
    API_KEY4
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
    try {
        const {name} = req.query;
        const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`);
        const recipesFromDB = await Recipes.findAll({include: Diets}) 
        const recipesFilteredDB = recipesFromDB.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                score: recipe.score,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                diets: recipe.diets.map( diet => diet.name)
            }
        })
        Promise.all([
            recipesFromApi,
            recipesFilteredDB
        ])
        .then( (respuesta) => {
            const [recipesAPI, recipesDB] = respuesta;
            const filteredFromAPI = recipesAPI.data.results.map( recipe => {
                if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) {
                    recipe.diets = [...recipe.diets, 'vegetarian']
                } else if (recipe.glutenFree  && !recipe.diets.includes('gluten free')){
                    recipe.diets = [...recipe.diets, 'gluten free']
                } else if (recipe.vegan  && !recipe.diets.includes('vegan')) {
                    recipe.diets = [...recipe.diets, 'vegan']
                }
                return {
                    id:    recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    diets: recipe.diets,
                    score: recipe.spoonacularScore,
                }
            })
            return allRecipes = [...recipesDB, ...filteredFromAPI]
        })
        .then( fullRecipes => {
            if(name) {
                const filter = fullRecipes.filter( recipe => recipe.title?.toLowerCase().includes(name.toLowerCase()) )
                res.json(filter)
            } else {
                res.json(fullRecipes)
            }
        })
    } catch (error) {
        next(error)        
    } 
})

router.get('/:idReceta', async (req, res, next) => {
    const {idReceta} = req.params;
    
    try {
        if(idReceta.length < 20 ) {
            const recipesFromApi = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY4}`);
            const recipe = recipesFromApi.data
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) {
                recipe.diets = [...recipe.diets, 'vegetarian']
              } else if (recipe.glutenFree  && !recipe.diets.includes('gluten free')){
                recipe.diets = [...recipe.diets, 'gluten free']
              } else if (recipe.vegan  && !recipe.diets.includes('vegan')) {
                recipe.diets = [...recipe.diets, 'vegan']
              }
            res.json(recipe)
        } else {
            const recipesFromDB = await Recipes.findAll({include: Diets});
            const recipe = recipesFromDB.map( recipe => {
                if(recipe.id.toString() === idReceta )
                return {
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    spoonacularScore: recipe.score,
                    summary: recipe.summary,
                    healthScore: recipe.healthScore,
                    diets: recipe.diets.map( diet => diet.name)
                }
            })
            res.json(recipe[0])
        }
    } catch (error) {
        next(error)
    }
        
})

router.post('/', async (req, res, next) => {
    try {
        const {title, summary, score, healthScore, steps, image, diets} = req.body;
        const newRecipe = await Recipes.create({
            title,
            summary,
            score,
            healthScore,
            image
        })
        const dietsDB = await Diets.findAll({
            where: {name: diets}
        }) 

        newRecipe.addDiets(dietsDB)

        res.status(201).send(newRecipe)
    } catch (error) {
        next(error)
    }
})

router.put('/', (req, res, next) => {
    res.status(201).send('Soy put /recipes')
})

router.delete('/', async (req, res, next) => {
    const {id} = req.body;
    try {
        await Recipes.destroy({
            where: {
                id: id
            }
        })
        res.send(`Receta con id: ${id} eliminada con éxito`)
    } catch (error) {
        next(error)        
    }
})

module.exports = router;