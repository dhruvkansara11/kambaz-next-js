"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsPersonCircle, BsFillInboxFill, BsCalendar3 } from "react-icons/bs";
import { LiaBookSolid } from "react-icons/lia";
import { FaFlask } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  type NavItemProps = {
    href: string;
    id: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  };

  const NavItem = ({ href, id, label, Icon }: NavItemProps) => {
    const active = isActive(href);

    return (
      <ListGroupItem
        className={`border-0 text-center ${
          active
            ? "bg-white border-start border-3 border-dark"
            : "bg-black"
        }`}
      >
        <Link
          href={href}
          id={id}
          className={`text-decoration-none d-inline-block w-100 ${
            active ? "text-danger fw-semibold" : "text-danger"
          }`}
        >
          <Icon
            className={`fs-1 mb-1 ${
              active ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          <span className="fs-6">{label}</span>
        </Link>
      </ListGroupItem>
    );
  };

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed bottom-0 top-0 bg-black z-2"
      style={{ width: 120 }}
    >
      {/* NEU Logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        href="https://www.northeastern.edu/"
        target="_blank"
        id="wd-neu-link"
      >
        <img src="/neu_image.png" width="75" alt="Northeastern University" />
      </ListGroupItem>

      <br />

      {/* Account */}
      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="/Account"
          id="wd-account-link"
          className="text-white text-decoration-none d-inline-block w-100"
        >
          <BsPersonCircle className="fs-1 text-white mb-1" />
          <br />
          <span className="fs-6">Account</span>
        </Link>
      </ListGroupItem>

      <br />

      {/* Navigation Links */}
      <NavItem
        href="/Dashboard"
        id="wd-dashboard-link"
        label="Dashboard"
        Icon={AiOutlineDashboard}
      />

      <br />

      <NavItem
        href="/Courses/1234/Home"
        id="wd-courses-link"
        label="Courses"
        Icon={LiaBookSolid}
      />

      <br />

      <NavItem
        href="/Calendar"
        id="wd-calendar-link"
        label="Calendar"
        Icon={BsCalendar3}
      />

      <br />

      <NavItem
        href="/Inbox"
        id="wd-inbox-link"
        label="Inbox"
        Icon={BsFillInboxFill}
      />

      <br />

      <NavItem
        href="/Labs"
        id="wd-labs-link"
        label="Labs"
        Icon={FaFlask}
      />
    </ListGroup>
  );
}
