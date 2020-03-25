import React from 'react';
import {Link} from "react-router-dom";
import requireAuth from './RequireAuth';

function IngredientList(props) {
  return (
    <Link to="/ingredients/2/edit/">Edit Ingredient</Link>
  );
}

export default requireAuth(IngredientList);
