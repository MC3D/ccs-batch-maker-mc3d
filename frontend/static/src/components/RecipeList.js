import React, { useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";

import { AppContext } from './../containers/App';
import Card from './Card';

export default function RecipeList(props) {
  const { state: store, dispatch: storeDispatch } = useContext(AppContext);

  useEffect(() => {
    const options = {
      headers: {
        'Authorization': `Token ${store.token}`,
      }
    };
    const fetchData = async () => {
      // const subscription = props.source.subscribe();
      const res = await fetch(`/api/v1/recipes/`, options);
      const data = await res.json();
      console.log(data)
      storeDispatch({type: 'FETCH_RECIPES', payload: data});
    }

    fetchData();

  }, [store.token, store.recipes, storeDispatch]);

  return (
    <main className='d-flex'>
      { store.isAuthenticated
          ?
            store.recipes.map(recipe => (
              <React.Fragment>
                <Card key={recipe.id} name={recipe.name} image={recipe.image} detailURL={`${props.match.path}/${recipe.id}`}/>
                <ul className='card-preview'>
                  {/*recipe.ingredients.map(ingredient => (
                    <li>{ingredient.name}</li>
                  ))*/}
                </ul>
              </React.Fragment>
            ))
          :
            <Redirect to='/accounts/login' />
        }
    </main>
  )
};
