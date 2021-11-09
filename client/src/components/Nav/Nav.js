import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipeByName } from '../../actions';
import './Nav.css'

export function Nav() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    dispatch(getRecipeByName(searchText));
  }

  return (
    <div className='navBar'>
      <Link to='/home' className='buttonNavBar'><span className='spanHome'>home</span></Link>
      <input type="text" placeholder="Find your recipe..."  className="searchBar" name="searchText" value= {searchText} onChange={handleInputChange} 
             autoComplete='off'/>
      <Link to='/NewRecipe' className='buttonNavBar'>+ Create new Recipe</Link>
    </div>
  )
};

export default Nav;