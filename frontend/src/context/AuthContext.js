import { createContext, useReducer, useEffect } from "react";

//useReducer is a similar state management variable like useState but useState is used for managing simple states and useReducer is used for managing
//complex state variables
//Along with useReducer we always have to use a reducer function here that is authReducer,   just like in useState we use count, setCount similarly

//createContext is used to create a context
// Context means to pass on data between multiple files

//Creating a new Context
export const AuthContext = createContext();

// This is the reducer function which is used with useReducer
// Reducer function takes 2 params always
// First one is state - the present state of the data to be passed or processed with
// Second one is action - An object which tells or defines what changes should be made to state

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

// Now we use useReducer
// we declare a new state named - state and a function named - dispatch
// state has initial value null ie user not logged in
// params is childer signifying that all the children component that uses this context can access this 2

export const AuthContextProvider = ({ children }) => {
  //This is nothing but
  // similar to useState
  // like state and set state
  // here we have used state and dispatch

  // Initially the state is setted null
  //and authReducer provides all the path through which states can be edited via dispatch function
  // Paths in the sense Login, Logout Type actions.'

  // So everytime we call an AuthContext context, we can either get hold of the current state.
  // Or we can use the dispatch function to edit the state depending upon the action type

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext State: ", state);

  //We always have to wrap our children or the component we are going to use Context in Provider element
  // Provider takes one prop called value which would be the data that would be passed on to its child

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
