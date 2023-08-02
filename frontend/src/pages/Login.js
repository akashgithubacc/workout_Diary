import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label> Email: </label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />

      <label> Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />

      <button type="submit" disabled={isLoading}>
        {" "}
        Log in{" "}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
