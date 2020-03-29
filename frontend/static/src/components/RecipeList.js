import React from 'react';
import requireAuth from './RequireAuth';

function RecipeList(props) {
  const recipes = props.recipes.map(recipe => <li key={recipe.id}><button type='button' onClick={() => props.selectRecipe(recipe)}>{recipe.name}</button></li>)
  return (
    <ul>{recipes}</ul>
  );
}

export default requireAuth(RecipeList);
