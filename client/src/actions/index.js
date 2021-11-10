import axios from 'axios';

export const getAllRecipes = () => {
    return async function(dispatch){
        const json = await axios('http://localhost:3001/api/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export const filterRecipesByDiet = (diets) => {
    return {
        type: 'FILTER_BY_DIET',
        payload: diets
    }
}

export const filterRecipesByScore = (score) => {
    return {
        type: 'FILTER_BY_SCORE',
        payload: score
    }
}

export const filterRecipesAscDesc = (filter) => {
    return {
        type: 'FILTER_BY_ASCDESC',
        payload: filter
    }
}

export const getRecipeDetails = (id) => {
    console.log(id)
    return async function(dispatch){
        const json = await axios(`http://localhost:3001/api/recipes/${id}`)
        return dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: json.data
        })
    }
}

export const getRecipeByName = (name) => {
    return async function(dispatch){
        const json = await axios(`http://localhost:3001/api/recipes?name=${name}`);
        return dispatch({
            type: 'GET_RECIPE_BY_NAME',
            payload: json.data
        })
    }
} 

export const getAllDiets = () => {
    return async function(dispatch){
        const json = await axios('http://localhost:3001/api/diets/types');
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}

export const postNewRecipe = (character) => {
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/api/recipes', character);
        console.log(json);
        return json;
    }
}

export const clearRecipeDetail = () => {
    return {
        type: 'CLEAR_DETAILED',
        payload: null
    }
}