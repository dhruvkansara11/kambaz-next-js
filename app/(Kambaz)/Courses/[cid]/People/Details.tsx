"use client";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import { FormControl } from "react-bootstrap";

interface PeopleDetailsProps {
  uid: string;
  onClose: () => void;
}

export default function PeopleDetails({ uid, onClose }: PeopleDetailsProps) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const saveUser = async () => {
    if (!user) return;

    let firstName = user.firstName;
    let lastName = user.lastName;

    if (name) {
      const nameParts = name.trim().split(" ");
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    }

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: email || user.email,
      role: role || user.role,
    };

    await client.updateUser(updatedUser);
    setUser(updatedUser);

    setEditing(false);
    setEditingEmail(false);
    setEditingRole(false);
    onClose();
  };

  const fetchUser = async () => {
    if (!uid) return;
    const response = await client.findUserById(uid);
    setUser(response);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!user) return null;

  return (
    <div
      className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"
      style={{ zIndex: 1050 }}
    >
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>

      <hr />

      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => {
              setEditing(true);
              setName(`${user?.firstName || ""} ${user?.lastName || ""}`);
            }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}

        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user?.firstName} {user?.lastName}
          </div>
        )}

        {editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user?.firstName || ""} ${user?.lastName || ""}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUser()}
          />
        )}
      </div>

      <div className="mt-2">
        <b>Email:</b>{" "}
        {!editingEmail && (
          <>
            <FaPencil
              onClick={() => {
                setEditingEmail(true);
                setEmail(user?.email || "");
              }}
              className="float-end fs-6 wd-edit-email"
            />
            <span className="wd-email">{user?.email}</span>
          </>
        )}

        {editingEmail && (
          <>
            <FaCheck
              onClick={saveUser}
              className="float-end fs-6 me-2 wd-save-email"
            />
            <FormControl
              type="email"
              className="w-75 wd-edit-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveUser()}
            />
          </>
        )}
      </div>

      <div className="mt-2">
        <b>Roles:</b>{" "}
        {!editingRole && (
          <>
            <FaPencil
              onClick={() => {
                setEditingRole(true);
                setRole(user?.role || "");
              }}
              className="float-end fs-6 wd-edit-role"
            />
            <span className="wd-roles">{user?.role}</span>
          </>
        )}

        {editingRole && (
          <>
            <FaCheck
              onClick={saveUser}
              className="float-end fs-6 me-2 wd-save-role"
            />
            <select
              className="form-select w-75 wd-edit-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="TA">Teaching Assistant</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </select>
          </>
        )}
      </div>

      <div className="mt-3">
        <b>Login ID:</b> <span>{user?.loginId}</span>
        <br />
        <b>Section:</b> <span>{user?.section}</span>
        <br />
        <b>Total Activity:</b> <span>{user?.totalActivity}</span>
      </div>

      <hr />

      <div className="d-flex justify-content-end">
        <button onClick={() => deleteUser(uid)} className="btn btn-danger me-2">
          Delete
        </button>

        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}
