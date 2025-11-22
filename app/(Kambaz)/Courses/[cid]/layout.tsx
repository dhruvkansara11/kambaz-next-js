/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./Breadcrumb";
import coursesData from "../../Database/courses.json";

type Course = {
  _id: string;
  number?: string;
  name: string;
  description: string;
  img?: string;
};

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const list = courses.length ? courses : (coursesData as Course[]);
  const course = list.find((c: any) => c._id === cid);

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Breadcrumb courseName={course?.name || "Course"} />
      </h2>
      <hr />

      <div className="d-flex">
        {showSidebar && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
