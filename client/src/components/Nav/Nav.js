import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearRecipeDetail, getRecipeByName } from '../../actions';
import './Nav.css'
export function Nav() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(searchText));
    setSearchText('')
  }
  const handleClick = () => {
    dispatch(clearRecipeDetail())
  }

  return (
    <div className='navBar'>
      <Link to='/home' className='buttonNavBar' onClick={handleClick}><span className='spanHome'>home</span></Link>
      <div className='searchBarContainer'>
        <input type="text" placeholder="Find your recipe..."  className="searchBar" name="searchText" value= {searchText} onChange={handleInputChange} 
              autoComplete='off'
        />
        <button className='searchButton' onClick={handleSearch}>Search</button>
      </div>
      <Link to='/NewRecipe' className='buttonNavBar'>+ Create new Recipe</Link>
    </div>
  )
};

export default Nav;