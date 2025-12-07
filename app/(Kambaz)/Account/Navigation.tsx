"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      <NavItem>
        {currentUser && currentUser.role === "ADMIN" && (
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.endsWith("Users")}
          >
            Users
          </NavLink>
        )}
      </NavItem>
    </Nav>
  );
}
