"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import PeopleDetails from "../../../Courses/[cid]/People/Details";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    console.log("selected user ", userId);
  };

  if (!users || users.length === 0) {
    return (
      <div id="wd-people-table" className="p-4">
        <h3>People</h3>
        <p>No users found.</p>
      </div>
    );
  }

  console.log("in shared people table: ", users.length);

  return (
    <div id="wd-people-table">
      <h3 className="mb-3">People ({users.length})</h3>
      {selectedUserId && (
        <PeopleDetails
          uid={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                {currentUser?.role === "ADMIN" ? (
                  <button
                    onClick={() => handleUserClick(user._id)}
                    className="btn btn-link text-decoration-none p-0 text-start"
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName} </span>
                    <span className="wd-last-name">{user.lastName}</span>
                  </button>
                ) : (
                  <span>
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName} </span>
                    <span className="wd-last-name">{user.lastName}</span>
                  </span>
                )}
              </td>
              <td className="wd-login-id">{user.loginId || user.username}</td>
              <td className="wd-section">{user.section || "N/A"}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">
                {user.totalActivity || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}