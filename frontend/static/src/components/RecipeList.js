import React from 'react';

function RecipeList(props) {
  const recipes = props.recipes.map(recipe => <li key={recipe.id}>{recipe.name}</li>)
  return (
    <ul>{recipes}</ul>
  );
}

export default RecipeList;
