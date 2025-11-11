/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "dhruv", // optional default for demo
    password: "pass12345678",
  });

  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    // Update Redux state
    dispatch(setCurrentUser(user));

    // Redirect to Dashboard
    redirect("/Dashboard");
  };

  return (
    <div
      id="wd-signin-screen"
      className="p-3 border rounded shadow-sm bg-white"
      style={{ maxWidth: 360, margin: "auto", marginTop: "100px" }}
    >
      <h3 className="mb-3 text-center">Sign In</h3>

      <input
        id="wd-username"
        placeholder="username"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="form-control mb-2"
      />

      <input
        id="wd-password"
        placeholder="password"
        type="password"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="form-control mb-3"
      />

      <button
        id="wd-signin-btn"
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
      >
        Sign In
      </button>

      <div className="text-center">
        <Link href="/Account/Signup" id="wd-signup-link" className="text-decoration-none">
          Signup
        </Link>
      </div>
    </div>
  );
}
