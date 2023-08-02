import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

//useAuthContext will return us the state and the dispatch function
//so when the data from the backend is reached on the frontend
//we can update the state and use the dispatch function

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //fetching data by the fetch api method

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    //The response from fetch always in the form of string
    //so we have to convert string into json

    const json = await response.json();

    console.log(json);

    //this response object has a property called "ok" which is similar
    //to status

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    //if we get the desired result, we have to update the state in context
    //by using dispatch

    //always the dispatch function is used to update the state
    //depending upon the action type
    if (response.ok) {
      //if the response is ok, then we store the user Data
      //in the browser till he is logged in or till the token
      //expires, after that we clear the local storage

      localStorage.setItem("user", JSON.stringify(json));

      //updating the state in auth context
      //we are firing the action type login and updating the user
      //data which is stored in "json"
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
