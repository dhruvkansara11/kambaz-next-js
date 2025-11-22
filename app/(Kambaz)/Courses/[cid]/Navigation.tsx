"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import "../../styles.css";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams(); // get dynamic route parameter
  const { cid } = params; // course ID from /Courses/[cid]/...
  console.log("in courses nav", params);
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => {
        // Construct href dynamically using the course id
        let href = `/Courses/${cid}/${link}`;
        // Determine if this link should be highlighted
        const isActive = pathname.startsWith(href);
        if (link == "People") {
          href += "/Table";
        }
        return (
          <Link
            key={index}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}