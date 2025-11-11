"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button } from "react-bootstrap";

export default function Profile() {
  // Local profile state
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch and load current user
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div
      id="wd-profile-screen"
      className="p-4 border rounded bg-white shadow-sm"
      style={{ maxWidth: 420, margin: "auto", marginTop: "100px" }}
    >
      <h3 className="mb-3 text-center">Profile</h3>

      {/* Username */}
      <input
        id="wd-username"
        placeholder="username"
        defaultValue={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        className="form-control mb-2"
      />

      {/* Password */}
      <input
        id="wd-password"
        type="password"
        placeholder="password"
        defaultValue={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        className="form-control mb-2"
      />

      {/* First Name */}
      <input
        id="wd-firstname"
        placeholder="First Name"
        defaultValue={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        className="form-control mb-2"
      />

      {/* Last Name */}
      <input
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        className="form-control mb-2"
      />

      {/* Date of Birth */}
      <input
        id="wd-dob"
        type="date"
        defaultValue={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        className="form-control mb-2"
      />

      {/* Email */}
      <input
        id="wd-email"
        type="email"
        placeholder="Email"
        defaultValue={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        className="form-control mb-2"
      />

      {/* Role */}
      <select
        id="wd-role"
        className="form-select mb-3"
        defaultValue={profile.role || "USER"}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      {/* Sign Out */}
      <Button
        id="wd-signout-btn"
        variant="danger"
        className="w-100"
        onClick={signout}
      >
        Sign Out
      </Button>
    </div>
  );
}
