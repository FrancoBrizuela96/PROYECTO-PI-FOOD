import React from 'react';
import './Paginado.css'

export const Paginado = ({recipesPerPage, allRecipes, paginado}) => {
    const pageNumbers = [];

    for ( let i=1; i<Math.ceil(allRecipes/recipesPerPage); i++ ){
        pageNumbers.push(i)
    }

    return (
        <nav className='paginadoContainer'>
            <ul className='ulPaginado'>
                {pageNumbers?.map(number => <li className='numberPaginado' key={number}> <span onClick = {() => paginado(number) }>{number} </span> </li>)}
            </ul>
        </nav>
    )
}