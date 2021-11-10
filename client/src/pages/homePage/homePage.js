import Nav from "../../components/Nav/Nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Card from "../../components/Cards/Card";
import './homePage.css'
import { getAllRecipes, filterRecipesByDiet, filterRecipesByScore, filterRecipesAscDesc, getAllDiets } from "../../actions";
import { Paginado } from "../../components/Paginado/Paginado";
import { firstLetterToCaps } from "../../helpers/firstLetterToCaps";
const HomePage =  () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector( (state) => state.recipes );
  const allDiets = useSelector(state => state.diets)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
      dispatch(getAllRecipes())
      dispatch(getAllDiets())
  }, [dispatch])

  const handlerFilterDiets = (event) => {
    dispatch(filterRecipesByDiet(event.target.value));
    setCurrentPage(1)
  }

  const handlerFilterScore = (event) => {
    dispatch(filterRecipesByScore(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado${event.target.value}`)
  }

  const handlerFilterAscDesc = (event) => {
    dispatch(filterRecipesAscDesc(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado${event.target.value}`)
    console.log(orden)
  }

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(getAllRecipes())
  }
  return (
    <div>
      <Nav/>
      <div className='filtersContainer'>
        <p className='FilterTEXT'>FILTERS</p> 
        <select className='selectAscDesc' onChange={handlerFilterAscDesc}>
            <option value='asc'>Ascendente A-Z</option>
            <option value='desc'>Descendente Z-A</option>
      </select>
      <select className='selectAscDesc' onChange={handlerFilterDiets}>
            {allDiets.map(diet => <option value={diet.name}>{firstLetterToCaps(diet.name)}</option>)}
            {/* <option value='all'>Show All</option>
            <option value='vegan'>Vegan</option>
            <option value='lacto ovo vegetarian'>Lacto ovo Vegetarian</option>
            <option value='pescatarian'>Pescatarian</option>
            <option value='gluten free'>Gluten Free</option>
            <option value='dairy free'>Dairy Free</option> */}
      </select>
      <select className='selectAscDesc' onChange={handlerFilterScore}>
            <option value='higher score'>Higher Score</option>
            <option value='lower score'>Lower Score</option>
      </select>
      <button className='selectAscDesc' onClick={handleReset}>Reset Filters</button>
      </div>
      <div className='CardContainer'>
          {currentRecipes?.map(recipe => 
            <Card 
               recipe={recipe}>
            </Card>
          )}
      </div>
      <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
    </div>
  );
}
    
  
  
  export default HomePage;