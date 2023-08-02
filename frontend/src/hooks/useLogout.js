import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //Only 2 things need to be done during logout
    // 1st - Clear the local storage
    // 2nd - set the context back to null or empty

    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
