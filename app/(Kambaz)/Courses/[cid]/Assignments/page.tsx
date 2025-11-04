"use client";

import { Badge, Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { BsGripVertical, BsPlus, BsSearch } from "react-icons/bs";
import { PiNotePencil } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import { useParams } from "next/navigation";

import * as db from "../../../Database/index"; // correct import path

export default function AssignmentList() {
  const { cid } = useParams(); // e.g., CS5200
  const assignments = db.assignments || [];

  // Filter assignments belonging to this course
  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      {/* ===== Top Controls ===== */}
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

        {/* Action buttons */}
        <div>
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
          courseAssignments.map((a) => (
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

                  {/* Assignment meta info */}
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Available from</b>{" "}
                    {new Date(a.availableFrom).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    | <b>Due</b>{" "}
                    {new Date(a.due).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    | <b>{a.points} pts</b>
                  </div>
                </div>

                <div className="d-flex align-items-center ms-2">
                  <FaCheckCircle className="text-success me-3 fs-5" />
                  <IoEllipsisVertical className="fs-4 text-muted" />
                </div>
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}