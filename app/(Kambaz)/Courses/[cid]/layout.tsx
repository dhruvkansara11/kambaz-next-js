import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import courses from "../../Database/courses.json";

type Course = {
    _id: string;
    number?: string;
    name: string;
    description: string;
    img?: string;
};

export default async function CoursesLayout({
    children,
    params,
}: Readonly<{
    children: ReactNode;
    params: Promise<{ cid: string }>
}>) {
    const { cid } = await params;
    const courseList = courses as Course[];
    const course = courseList.find((c) => c._id === cid);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                <Breadcrumb courseName={course?.name} />
            </h2>
            <hr />

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}