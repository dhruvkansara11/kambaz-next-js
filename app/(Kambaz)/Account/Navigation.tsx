"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
    const pathname = usePathname();
    const items = [
        { id: "wd-account-signin-link", label: "Signin", href: "/Account/Signin" },
        { id: "wd-account-signup-link", label: "Signup", href: "/Account/Signup" },
        { id: "wd-account-profile-link", label: "Profile", href: "/Account/Profile" },
    ];
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {items.map((it) => {
                const active = pathname.startsWith(it.href);
                return (
                    <Link
                        key={it.id}
                        id={it.id}
                        href={it.href}
                        className={`list-group-item border-0 ${active ? "active" : "text-danger"}`}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </div>
    );
}
