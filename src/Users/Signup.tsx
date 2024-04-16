import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "", firstName: "", lastName: "", role: "USER" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      if (user.firstName === "" || user.lastName === "" || user.password === "" || user.lastName === "") {
        alert("Please enter all the relevant information");
        return;
      }
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      navigate("/Kanbas/Account/Profile");
    } catch (errors: any) {
      return;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input placeholder="username" value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input placeholder="password" value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <input placeholder="first name" value={user.firstName} onChange={(e) => setUser({
          ...user, firstName: e.target.value })} />
      <input placeholder="Last name" value={user.lastName} onChange={(e) => setUser({
          ...user, lastName: e.target.value })} />
      <button className="btn btn-primary" onClick={signup}> Signup </button>
      <Link to={"/Kanbas/Account/Signin"}>Have an Account? Signin</Link>
    </div>
  );
}
