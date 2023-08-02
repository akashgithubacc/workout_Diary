import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//useContext hooks is used for consuming the data passed on by the context
// by using this hook we can directly access the data passed in via context
// syntax :- useContext(Context Object)

//This is a convinience not a neccessary
// We created this custom hooks using useContext so that we can have a more relatable name and it performes the same function
// the data from useContext hook is stored in context variable and when we will call useAuthContext it would be given the otp

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
