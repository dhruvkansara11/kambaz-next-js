"use client";

import Link from "next/link";

export default function Signup() {
    return (
        <div id="wd-signup-screen" className="p-3" style={{ maxWidth: 360 }}>
            <h3 className="mb-3">Signup</h3>

            <input id="wd-new-username" placeholder="username" className="form-control mb-2" />
            <input id="wd-new-password" placeholder="password" type="password" className="form-control mb-3" />

            <Link
                href="/Account/Profile"
                id="wd-signup-btn"
                className="btn btn-primary w-100 mb-2"
            >
                Signup
            </Link>

            <Link href="/Account/Signin" id="wd-back-to-signin">
                Signin
            </Link>
        </div>
    );
}
