"use client";

import Link from "next/link";

export default function Signin() {
    return (
        <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 360 }}>
            <h3 className="mb-3">Signin</h3>

            <input
                id="wd-username"
                placeholder="username"
                defaultValue="dhruv"
                className="form-control mb-2"
            />
            <input
                id="wd-password"
                placeholder="password"
                type="password"
                defaultValue="pass12345678"
                className="form-control mb-3"
            />

            <Link
                href="/Dashboard"
                id="wd-signin-btn"
                className="btn btn-primary w-100 mb-2"
            >
                Signin
            </Link>

            <Link href="/Account/Signup" id="wd-signup-link">
                Signup
            </Link>
        </div>
    );
}
