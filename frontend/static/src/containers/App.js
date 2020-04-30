import React, { createContext, useEffect } from "react";
import { withRouter } from 'react-router'
// import Cookies from 'js-cookie';

export const AppContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  recipes: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // localStorage.setItem("ccs-batch-maker-token", action.payload.token);
      // localStorage.setItem("ccs-batch-maker-user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      // localStorage.removeItem("ccs-batch-maker-token");
      // localStorage.removeItem("ccs-batch-maker-user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'FETCH_RECIPES':
      return {
        ...state,
        recipes: action.payload
      }
    default:
      return state;
  }
};

function App(props) {
  // state that is used in the component
  // a function that is used in the application to transfrom state
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if(!state.isAuthenticated && localStorage.getItem('ccs-batch-maker-token')) {
    dispatch({
      type: 'LOGIN',
      payload: {
        user: JSON.parse(localStorage.getItem('ccs-batch-maker-user')),
        token: localStorage.getItem('ccs-batch-maker-token'),
      }
    });
  }

  // if(state.isAuthenticated) {
  //   useEffect(() => {
  //     const options = {
  //       headers: {
  //         'Authorization': `Token ${store.token}`,
  //       }
  //     };
  //     const fetchData = async () => {
  //       // const subscription = props.source.subscribe();
  //       const res = await fetch(`/api/v1/recipes/`, options);
  //       const data = await res.json();
  //       dispatch({type: 'FETCH_RECIPES', payload: data});
  //     }
  //
  //     fetchData();
  //
  //   }, [store.token]);
  // }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { props.children }
    </AppContext.Provider>
  );
}

export default withRouter(App);


//   fetchRecipes = () => {
//
//     const options = {
//       headers: {
//         'Authorization': `Token ${JSON.parse(localStorage.getItem('ccs-batch-maker')).key}`,
//       }
//     }
//
//     fetch(`/api/v1/recipes/`, options)
//       .then((res) => {
//         // NEED TO ENFORCE THAT STATUS IS OK ELSE RECIPES IS SET INCORRECTY ON
//         // STATE FOR SUCCESSFUL REQUESTS OTHER THAN STATUS OK
//         return res.json();
//       })
//       .then((data) => {
//         this.setState({recipes: data});
//       })
//       .catch((err) => {
//         console.error('Error:', err);
//       });
//   }
//
