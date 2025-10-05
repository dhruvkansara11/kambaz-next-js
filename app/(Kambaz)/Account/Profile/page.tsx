'use client';
import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: 420}}>
      <h3 className="mb-3 text-center">Profile</h3>

      {/* Username */}
      <input
        id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="form-control mb-2"
      />

      {/* Password */}
      <input
        id="wd-password"
        type="password"
        placeholder="password"
        defaultValue="123"
        className="form-control mb-2"
      />

      {/* First Name */}
      <input
        id="wd-firstname"
        placeholder="First Name"
        defaultValue="Alice"
        className="form-control mb-2"
      />

      {/* Last Name */}
      <input
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue="Wonderland"
        className="form-control mb-2"
      />

      {/* Date of Birth */}
      <input
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="form-control mb-2"
      />

      {/* Email */}
      <input
        id="wd-email"
        type="email"
        placeholder="Email"
        defaultValue="alice@wonderland"
        className="form-control mb-2"
      />

      {/* Role */}
      <select id="wd-role" className="form-select mb-3" defaultValue="FACULTY">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      {/* Signout Button */}
      <Link href="/Account/Signin" id="wd-signout-btn" className="btn btn-danger w-100">
        Signout
      </Link>
    </div>
  );
}