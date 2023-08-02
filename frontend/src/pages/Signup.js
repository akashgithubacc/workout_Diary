import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Signup</h3>

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
        Sign in{" "}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
