"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Table, Button, FormControl, FormSelect } from "react-bootstrap";

import usersDB from "../../../../Database/users.json";
import enrollmentsDB from "../../../../Database/enrollments.json";

import { FaUserCircle } from "react-icons/fa";
import {
  FaTrash,
  FaPencilAlt,
  FaSave,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

// ---------------- TYPES ----------------
type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

const EMPTY_NEW_USER: Partial<User> = {
  username: "",
  password: "changeme",
  firstName: "",
  lastName: "",
  loginId: "",
  section: "",
  role: "STUDENT",
};

export default function PeopleTable() {
  const { cid } = useParams() as { cid: string };

  // ---------------- COURSE MAPPING ----------------
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
    (cid?.toUpperCase().startsWith("CS")
      ? cid.toUpperCase()
      : "CS" + cid.toUpperCase());

  // ---------------- STATE ----------------
  const [allUsers, setAllUsers] = useState<User[]>(usersDB);
  const [enrollments, setEnrollments] = useState(enrollmentsDB);

  const [roster, setRoster] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit + Add forms
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<User> | null>(null);

  const [newUser, setNewUser] = useState<Partial<User>>({ ...EMPTY_NEW_USER });

  const canManage = true; // CLIENT VERSION — always allowed

  // ---------------- LOAD ROSTER ----------------
  useEffect(() => {
    setLoading(true);

    const enrolled = enrollments.filter(
      (e) => e.course.toLowerCase() === mappedCourse.toLowerCase()
    );

    const ids = enrolled.map((e) => e.user);

    setRoster(allUsers.filter((u) => ids.includes(u._id)));

    setLoading(false);
  }, [cid, enrollments, allUsers, mappedCourse]);

  // ---------------- CREATE USER ----------------
  const onCreate = () => {
    if (!newUser.username || !newUser.firstName || !newUser.lastName) return;

    const newId = "u_" + Math.floor(Math.random() * 100000);

    const created: User = {
      _id: newId,
      username: newUser.username!,
      password: newUser.password || "changeme",
      firstName: newUser.firstName!,
      lastName: newUser.lastName!,
      loginId: newUser.loginId || newUser.username!,
      section: newUser.section || "S101",
      role: newUser.role || "STUDENT",
      lastActivity: new Date().toISOString().slice(0, 10),
      totalActivity: "00:00:00",
    };

    // Add to user list
    setAllUsers((u) => [...u, created]);

      // Enroll them
      setEnrollments((prev) => [
        ...prev,
        {
          _id: "en_" + Math.floor(Math.random() * 1000000), 
          user: created._id,
          course: mappedCourse,
        },
      ]);

    setNewUser({ ...EMPTY_NEW_USER });
  };

  // ---------------- EDIT USER ----------------
  const startEdit = (u: User) => {
    setEditingId(u._id);
    setDraft({ ...u });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const onSaveEdit = () => {
    if (!editingId || !draft) return;

    setAllUsers((list) =>
      list.map((u) => (u._id === editingId ? { ...u, ...draft } : u))
    );

    cancelEdit();
  };

  // ---------------- DELETE USER ----------------
  const onDelete = (u: User) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`Remove ${u.firstName} ${u.lastName}?`)
    )
      return;

    // Remove from user list
    setAllUsers((prev) => prev.filter((x) => x._id !== u._id));

    // Remove enrollment
    setEnrollments((prev) =>
      prev.filter((e) => !(e.user === u._id && e.course === mappedCourse))
    );
  };

  // ---------------- RENDER ROW ----------------
  const renderRow = (u: User) => {
    const isEditing = editingId === u._id;

    if (!isEditing || !draft) {
      return (
        <tr key={u._id}>
          <td className="text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            {u.firstName} {u.lastName}
          </td>
          <td>{u.loginId}</td>
          <td>{u.section}</td>
          <td>{u.role}</td>
          <td>{u.lastActivity}</td>
          <td>{u.totalActivity}</td>
          {canManage && (
            <td className="text-nowrap">
              <Button
                size="sm"
                variant="outline-primary"
                className="me-2"
                onClick={() => startEdit(u)}
              >
                <FaPencilAlt />
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(u)}
              >
                <FaTrash />
              </Button>
            </td>
          )}
        </tr>
      );
    }

    // EDIT MODE
    return (
      <tr key={u._id}>
        <td className="text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <div>
            <FormControl
              className="mb-1"
              value={draft.firstName ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, firstName: e.target.value })
              }
            />
            <FormControl
              value={draft.lastName ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, lastName: e.target.value })
              }
            />
          </div>
        </td>

        <td>
          <FormControl
            value={draft.loginId ?? ""}
            onChange={(e) =>
              setDraft({ ...draft, loginId: e.target.value })
            }
          />
        </td>

        <td>
          <FormControl
            value={draft.section ?? ""}
            onChange={(e) =>
              setDraft({ ...draft, section: e.target.value })
            }
          />
        </td>

        <td>
          <FormSelect
            value={draft.role ?? "STUDENT"}
            onChange={(e) =>
              setDraft({ ...draft, role: e.target.value })
            }
          >
            <option value="STUDENT">STUDENT</option>
            <option value="TA">TA</option>
            <option value="FACULTY">FACULTY</option>
          </FormSelect>
        </td>

        <td>{u.lastActivity}</td>
        <td>{u.totalActivity}</td>

        <td className="text-nowrap">
          <Button
            size="sm"
            variant="success"
            className="me-2"
            onClick={onSaveEdit}
          >
            <FaSave />
          </Button>
          <Button size="sm" variant="secondary" onClick={cancelEdit}>
            <FaTimes />
          </Button>
        </td>
      </tr>
    );
  };

  // ---------------- UI ----------------
  return (
    <div id="wd-people-table" className="p-3">
      <h3 className="mb-3">
        People enrolled in <strong>{mappedCourse}</strong>
      </h3>

      {/* ADD USER */}
      {canManage && (
        <div className="mb-4 border rounded p-3">
          <h5 className="mb-3">
            <FaPlus className="me-2" /> Add User to Course
          </h5>

          <div className="row g-2">
            <div className="col-md-3">
              <FormControl
                placeholder="Username"
                value={newUser.username ?? ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <FormControl
                placeholder="First name"
                value={newUser.firstName ?? ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <FormControl
                placeholder="Last name"
                value={newUser.lastName ?? ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <FormSelect
                value={newUser.role ?? "STUDENT"}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TA">TA</option>
                <option value="FACULTY">FACULTY</option>
              </FormSelect>
            </div>

            <div className="col-md-1 d-grid">
              <Button variant="primary" onClick={onCreate}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {canManage && <th />}
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="text-muted">
                Loading roster...
              </td>
            </tr>
          )}

          {!loading && roster.map(renderRow)}

          {!loading && roster.length === 0 && (
            <tr>
              <td colSpan={7} className="text-muted">
                No people enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
