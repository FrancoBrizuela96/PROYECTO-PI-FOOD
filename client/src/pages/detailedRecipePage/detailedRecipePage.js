import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getRecipeDetails } from "../../actions";
import Nav from "../../components/Nav/Nav";
import './detailedRecipePage.css'

function DetailedRecipePage() {
    
    const {idRecipe} = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector( (state) => state.recipeDetailed );
    
    useEffect(() => {
      dispatch(getRecipeDetails(idRecipe))
    }, [dispatch, idRecipe])
    
    return (
      <div>
        <Nav/>
        <div className='CardContainerDetailed'>
          <h2 className='detailedTitle'>{recipe.title}</h2>
          <img src={recipe.image} alt='Img not found' className='detailedImage'/>
          {
            (recipe?.dishTypes) 
            ? <h4 className='detailsTitle'>Dish Types: <br/> <div className='detailsInfo'>{recipe?.dishTypes?.join(', ')+'.'}</div></h4>
            : null
          }
          <h4 className='detailsTitle'>Diet Types: <br/> <div className='detailsInfo'>{recipe?.diets?.join(', ')}</div></h4>
          <h4 className='detailsTitle'>Summary: <div className='detailsInfo' dangerouslySetInnerHTML={{__html: recipe.summary}} /></h4>
          {
            (recipe?.dishTypes) 
            ? <h4 className='detailsTitle'> Steps: <div className='detailsInfo' dangerouslySetInnerHTML={{__html: recipe.instructions}} /></h4>
            : null
          }
          <h4 className='detailsTitle'>Score: <div className='detailsInfo'> {recipe.spoonacularScore}</div></h4>
          <h4 className='detailsTitle'>HealthScore: <div className='detailsInfo'> {recipe.healthScore}</div></h4>
        </div>
      </div>
    );
  }
  
  export default DetailedRecipePage;