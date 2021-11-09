import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllDiets, postNewRecipe } from "../../actions";
import Nav from "../../components/Nav/Nav";
import './newRecipe.css'

const validateInput = (input) => {
  let errors = {};
  if(!input.title) {
    errors.title = 'Title is required';
  } else if (!input.summary) {
    errors.summary = 'Summary is required';
  } else if (!input.score) {
    errors.score = 'Score is required';
  } else if (!input.healthScore) {
    errors.healthScore = 'HealthScore is required';
  } else if (!input.image) {
    errors.image = 'Image is required';
  }
  return errors
}

function NewRecipe() {
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)
  const [errors, setErrors] = useState({
    title: 'Title is required'
  })
  const [input, setInput] = useState({
    title: '',
    summary: '',
    score: '',
    healthScore: '',
    image: '',
    diets: []
  })
  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])
  
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setErrors(validateInput({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelect = (e) => {
    if(!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewRecipe(input));
    alert('New recipe created !')
    setInput({
      title: '',
      summary: '',
      score: '',
      healthScore: '',
      image: '',
      diets: []
    })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== e.target.value)
    })
  }
  
  return (
    <> 
    <Nav/>
    <div className='newRecipeContainer'>
        <h1 className='createRecipeTitle'> Create your new Recipe !</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputsContainer'>
            <label className='labelForm'>Title:</label>
            <input placeholder='Insert your Title...' className='inputForm' type='text' value={input.title} name='title' onChange={handleInputChange}/> 
            {errors.title && <span className='errorForm'>{errors.title}</span>}
          </div>
          <div className='inputsContainer'>
            <label className='labelForm'>Summary:</label>
            <input placeholder='Insert your Summary...' className='inputForm' type='text' value={input.summary} name='summary' onChange={handleInputChange}/>
            {errors.summary && <span className='errorFormSummary'>{errors.summary}</span>}
          </div>
          <div className='inputsContainer'>
            <label className='labelForm'>Score:</label>
            <input placeholder='Insert your Score...' className='inputForm' type='text' value={input.score} name='score' onChange={handleInputChange}/>
            {errors.score && <span className='errorForm'>{errors.score}</span>}
          </div>
          <div className='inputsContainer'>
            <label className='labelForm'>HealthScore:</label>
            <input placeholder='Insert your HealthScore...' className='inputForm' type='text' value={input.healthScore} name='healthScore' onChange={handleInputChange}/>
            {errors.healthScore && <span className='errorFormHealth'>{errors.healthScore}</span>}
          </div>
          <div className='inputsContainer'>
            <label className='labelForm'>Image:</label>
            <input placeholder='Insert your image URL...' className='inputForm' type='text' value={input.image} name='image' onChange={handleInputChange}/>
            {errors.image && <span className='errorForm'>{errors.image}</span>}
          </div>
          <div className='inputsContainer'>
            <label className='labelForm'>Choose Diets from the List:</label>    
            <select onChange={handleSelect} className='selectForm'>
             {diets.map(diet => <option value={diet.name}>{diet.name}</option>)}
            </select>
          </div>
          <ul className='inputsContainer'>
            {input.diets.map(diet =>  <li className='listDiet'>{diet}<button className='buttonDelete' value={diet} onClick={handleDelete}>X</button></li> )}
          </ul>
          <button disabled={Object.keys(errors).length > 0} type='submit' className='buttonCreateRecipe'>Create Recipe !</button>
        </form>
      </div>
      </>
    );
  }
  
  export default NewRecipe;   
