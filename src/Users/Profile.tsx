import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
    return;
  };

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (errors: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };

  const save = async () => {
    if (profile.username === "" || profile.password === "" || profile.firstName === "" || profile.lastName === "") {
      alert("Please enter all the necessary information");
      return;
    }
    await client.updateUser(profile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <h1>Profile</h1>
        <Link to="/Kanbas/Account/Admin/Users"
          className="btn btn-warning">
          Users
        </Link>
      </div>
      <div style={{
          width: 'auto',
          height: 'auto',
      }}>
        {profile && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '500px'
          }}>
            <input placeholder="username" value={profile.username} onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })}/>
            <input placeholder="password" value={profile.password} onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })}/>
            <input placeholder="first name" value={profile.firstName} onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })}/>
            <input placeholder="last name" value={profile.lastName} onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })}/>
            <input placeholder="date of birth" value={profile.dob} type="date" onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })}/>
            <input placeholder="email" value={profile.email} onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })}/>
            <select onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
            <button className="btn btn-danger" onClick={signout}>
              Signout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
