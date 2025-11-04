"use client";
import React from "react";
import { useParams } from "next/navigation";
import users from "../../../../Database/users.json";
import enrollments from "../../../../Database/enrollments.json";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  const { cid } = useParams() as { cid: string };


  const courseMap: Record<string, string> = {
    reactapp: "CS1234",
    webdev: "CS5200",
    dbms: "CS5130",
    algo: "CS5800",
    design: "CS5500",
    oop: "CS5010",
    networks: "CS5700",
  };


const mappedCourse =
  courseMap[cid?.toLowerCase()] ||
  (cid?.toUpperCase().startsWith("CS") ? cid.toUpperCase() : "CS" + cid.toUpperCase());


  const currentEnrollments = enrollments.filter(
    (e) => e.course.toLowerCase() === mappedCourse.toLowerCase()
  );


  const enrolledUserIds = currentEnrollments.map((e) => e.user);


  const roster = users.filter((u) => enrolledUserIds.includes(u._id));

  return (
    <div id="wd-people-table" className="p-3">
      <h5 className="mb-3">
        People enrolled in <strong>{mappedCourse}</strong>
      </h5>

      <Table striped bordered hover responsive>
        <thead className="table-light">
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
          {roster.length > 0 ? (
            roster.map((user) => (
              <tr key={user._id}>
                <td>
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.loginId}</td>
                <td>{user.section}</td>
                <td>{user.role}</td>
                <td>{user.lastActivity}</td>
                <td>{user.totalActivity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-muted py-3">
                No people enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}