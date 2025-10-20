"use client";

import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";


import users from "../../../../Database/users.json";
import enrollments from "../../../../Database/enrollments.json";

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
};

type Enrollment = { _id: string; user: string; course: string };

export default function PeopleTable() {
    const { cid } = useParams() as { cid: string };

    // show only users enrolled in the current course
    const roster = (users as User[]).filter((u) =>
        (enrollments as Enrollment[]).some((e) => e.user === u._id && e.course === cid)
    );

    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {roster.map((u) => (
                        <tr key={u._id}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{u.firstName}</span>{" "}
                                <span className="wd-last-name">{u.lastName}</span>
                            </td>
                            <td className="wd-login-id">{u.loginId}</td>
                            <td className="wd-section">{u.section}</td>
                            <td className="wd-role">{u.role}</td>
                            <td className="wd-last-activity">{u.lastActivity}</td>
                            <td className="wd-total-activity">{u.totalActivity}</td>
                        </tr>
                    ))}

                    {roster.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-muted">
                                No people enrolled in this course.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
