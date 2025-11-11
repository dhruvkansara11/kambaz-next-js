"use client";

import { useState } from "react";
import { useParams, redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  Badge,
  Button,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { BsGripVertical, BsPlus, BsSearch } from "react-icons/bs";
import { VscTriangleDown } from "react-icons/vsc";
import { PiNotePencil } from "react-icons/pi";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

import { deleteAssignment } from "./reducer";
import AssignmentDeleter from "./AssignmentDeleter";
import AssignmentsControls from "./AssignmentsControls";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // ✅ Safe selectors
  const assignmentsState = useSelector((state: any) => state.assignmentsReducer);
  const accountState = useSelector((state: any) => state.accountReducer);

  const assignments = assignmentsState?.assignments || [];
  const currentUser = accountState?.currentUser;

  // ✅ Redirect if not signed in
  if (!currentUser) {
    redirect("/Account/Signin");
  }

  const [show, setShow] = useState(false);
  const [aid, setAid] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = (id: string) => {
    setAid(id);
    setShow(true);
  };

  // Filter assignments for this course
  const courseAssignments = assignments.filter(
    (a: any) => a.course === cid
  );

  return (
    <Container id="wd-assignments" className="p-3">
      {/* ===== Top Controls ===== */}
      <AssignmentsControls />

      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search bar */}
        <div className="position-relative" style={{ maxWidth: "300px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" />
          <Form.Control
            type="text"
            placeholder="Search..."
            id="wd-search-assignment"
            className="ps-5"
          />
        </div>

        {/* Add buttons (faculty only) */}
        <div>
          {currentUser?.role === "FACULTY" && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="me-2"
                id="wd-add-assignment-group"
              >
                <BsPlus className="me-1 fs-6" /> Group
              </Button>
              <Button variant="danger" size="sm" id="wd-add-assignment">
                <BsPlus className="me-1 fs-6" /> Assignment
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ===== Section Header ===== */}
      <div className="d-flex justify-content-between align-items-center bg-light border p-2">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-3 fs-4 text-muted" />
          <VscTriangleDown className="me-2" />
          <div className="fw-bold">ASSIGNMENTS</div>
        </div>
        <div className="d-flex align-items-center">
          <Badge pill bg="light" text="dark" className="fw-normal me-2 border">
            40% of Total
          </Badge>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4 text-muted" />
        </div>
      </div>

      {/* ===== Assignment List ===== */}
      <ListGroup id="wd-assignment-list" className="list-group-flush">
        {courseAssignments.length === 0 ? (
          <ListGroupItem className="text-muted small">
            No assignments found for this course.
          </ListGroupItem>
        ) : (
          courseAssignments.map((a: any) => (
            <ListGroupItem
              key={a._id}
              className="d-flex p-0 border-0 border-bottom rounded-0"
            >
              {/* Left green bar */}
              <span
                className="bg-success align-self-stretch"
                style={{ width: 4 }}
              />

              {/* Main Content */}
              <div className="d-flex align-items-start w-100 p-2 ps-3">
                <BsGripVertical className="me-2 fs-4 text-muted" />
                <PiNotePencil className="me-3 fs-4 text-success" />

                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="fw-bold text-decoration-none text-dark"
                  >
                    {a.title}
                  </Link>

                  <div className="text-muted small mt-1">
                    <span className="text-danger">
                      {a.modules
                        ? a.modules.length > 1
                          ? "Multiple Modules"
                          : "Single Module"
                        : "No Module"}
                    </span>{" "}
                    | <b>Available from</b> {formatDate(a.availableDate)} |{" "}
                    <b>Due</b> {formatDate(a.dueDate)} |{" "}
                    <b>{a.points} pts</b>
                  </div>
                </div>

                <div className="d-flex align-items-center ms-2">
                  {currentUser?.role === "FACULTY" ? (
                    <FaTrash
                      className="text-danger me-3 fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleShow(a._id)}
                    />
                  ) : (
                    <FaCheckCircle className="text-success me-3 fs-5" />
                  )}
                  <IoEllipsisVertical className="fs-4 text-muted" />
                </div>
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>

      {/* ===== Delete Confirmation Modal ===== */}
      <AssignmentDeleter
        show={show}
        handleClose={handleClose}
        dialogTitle="Delete Assignment"
        assignmentName={
          assignments.find((x: any) => x._id === aid)?.title || ""
        }
        deleteAssignment={() => {
          const assignmentToDelete = assignments.find(
            (x: any) => x._id === aid
          );
          if (assignmentToDelete) {
            dispatch(deleteAssignment(assignmentToDelete));
            handleClose();
          }
        }}
      />
    </Container>
  );
}
