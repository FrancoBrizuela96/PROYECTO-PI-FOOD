import { Link } from 'react-router-dom';
import './Card.css'


export function Card({recipe}) {
    return (
      <div className='cardContainer'>
          <div className='card'>
            <Link to={`/recipe/${recipe.id}`} style={{textDecoration:'none'}}>
              <p className='cardTitle'>{recipe.title}</p>
              <img src={recipe.image} className='cardImage'/>
            </Link> 
            <p className='dietsText'>
              {'Diets: ' + recipe.diets.join(', ')}
            </p>
            {/* <p>{recipe.score}</p> */}
          </div>
      </div>
    )
  };
  
  export default Card;