import React from 'react';
import {Link} from "react-router-dom";

function IngredientList(props) {
  return (
    <Link to="/ingredients/2/edit/">Edit Ingredient</Link>
  );
}

export default IngredientList;
