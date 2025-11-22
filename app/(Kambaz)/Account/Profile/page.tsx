"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

type HttpErrorShape = {
  response?: { data?: { message?: string } };
};

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  // -----------------------------
  // LOAD PROFILE USING API
  // -----------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const user = await client.profile();
        setProfile(user);
        dispatch(setCurrentUser(user));
      } catch (e) {
        redirect("/Account/Signin");
      }
    };

    load();
  }, [dispatch]);

  if (!profile) return null;

  // -----------------------------
  // UPDATE PROFILE USING API
  // -----------------------------
  const updateProfile = async () => {
    setError(null);
    setSuccess(false);
    setBusy(true);

    try {
      const updated = await client.updateUser(profile._id, profile);
      setProfile(updated);
      dispatch(setCurrentUser(updated));
      setSuccess(true);
    } catch (err: unknown) {
      const maybe = err as HttpErrorShape;
      const msg = maybe.response?.data?.message ?? "Failed to update profile";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  // -----------------------------
  // SIGN OUT USING API
  // -----------------------------
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  return (
    <div
      id="wd-profile-screen"
      className="p-4 border rounded bg-white shadow-sm"
      style={{ maxWidth: 420, margin: "auto", marginTop: "100px" }}
    >
      <h3 className="mb-3 text-center">Profile</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Profile saved!</div>}

      {/* Username */}
      <input
        id="wd-username"
        className="form-control mb-2"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      {/* Password */}
      <input
        id="wd-password"
        type="password"
        className="form-control mb-2"
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      {/* First Name */}
      <input
        id="wd-firstname"
        className="form-control mb-2"
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      {/* Last Name */}
      <input
        id="wd-lastname"
        className="form-control mb-2"
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      {/* DOB */}
      <input
        id="wd-dob"
        type="date"
        className="form-control mb-2"
        value={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      {/* Email */}
      <input
        id="wd-email"
        type="email"
        className="form-control mb-2"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      {/* Role */}
      <select
        id="wd-role"
        className="form-select mb-3"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">TA</option>
        <option value="STUDENT">Student</option>
      </select>

      {/* UPDATE */}
      <button
        onClick={updateProfile}
        className="btn btn-primary w-100 mb-2"
        disabled={busy}
      >
        {busy ? "Updating..." : "Update"}
      </button>

      {/* SIGN OUT */}
      <button
        onClick={signout}
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign Out
      </button>
    </div>
  );
}
