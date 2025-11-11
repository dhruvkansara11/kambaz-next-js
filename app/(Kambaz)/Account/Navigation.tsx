"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  // Dynamic links: show Profile if logged in, else Signin + Signup
  const items = currentUser
    ? [
        { id: "wd-account-profile-link", label: "Profile", href: "/Account/Profile" },
      ]
    : [
        { id: "wd-account-signin-link", label: "Signin", href: "/Account/Signin" },
        { id: "wd-account-signup-link", label: "Signup", href: "/Account/Signup" },
      ];

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.id}
            id={item.id}
            href={item.href}
            className={`list-group-item border-0 ${
              active ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
