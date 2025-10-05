"use client";

import Link from "next/link";
import { Button, Form, InputGroup, Badge } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaCaretDown } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Assignments({ params }: { params: { cid: string } }) {
  const { cid } = params;

  const assignmentData = [
    {
      id: "123",
      title: "A1 - ENV + HTML",
      available: "Not available until May 6 at 12:00am",
      due: "Due May 13 at 11:59pm",
      points: "100 pts",
    },
    {
      id: "124",
      title: "A2 - CSS + BOOTSTRAP",
      available: "Not available until May 13 at 12:00am",
      due: "Due May 20 at 11:59pm",
      points: "100 pts",
    },
    {
      id: "125",
      title: "A3 - JAVASCRIPT + REACT",
      available: "Not available until May 20 at 12:00am",
      due: "Due May 27 at 11:59pm",
      points: "100 pts",
    },
  ];

  return (
    <div id="wd-assignments" className="p-3">
      {/* ---------- Top Row: Search + Buttons ---------- */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="flex-grow-1" style={{ maxWidth: 420 }}>
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <FiSearch />
            </InputGroup.Text>
            <Form.Control id="wd-search-assignment" placeholder="Search..." />
          </InputGroup>
        </div>
        <div className="ms-3">
          <Button id="wd-add-assignment-group" variant="secondary" className="me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button id="wd-add-assignment" variant="danger">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* ---------- Assignment Group Container ---------- */}
      <div className="border rounded mb-3">
        {/* Header Bar */}
        <div className="bg-secondary px-3 py-2 d-flex align-items-center border-bottom">
          <BsGripVertical className="me-2 text-dark" />
          <FaCaretDown className="me-2 fs-5 text-dark" />
          <h3 id="wd-assignments-title" className="m-0 me-auto fw-semibold">
            ASSIGNMENTS
          </h3>
          <Badge bg="light" text="dark" className="me-2 border px-3 py-2">
            40% of Total
          </Badge>
          <Button size="sm" variant="light" className="border me-1 rounded-circle">
            <FaPlus />
          </Button>
          <IoEllipsisVertical className="fs-5 text-secondary" />
        </div>

        {/* Assignment List */}
        <div className="border-start border-4 border-success bg-white">
          <ul id="wd-assignment-list" className="list-unstyled m-0">
            {assignmentData.map((a) => (
              <li key={a.id} className="wd-assignment-list-item p-3 border-bottom">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 text-secondary" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/${cid}/Assignments/${a.id}`}
                      className="fw-semibold text-decoration-none text-dark"
                    >
                      {a.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger fw-semibold">Multiple Modules</span>
                      &nbsp;|&nbsp; {a.available} &nbsp;|&nbsp;
                      <strong>{a.due}</strong> &nbsp;|&nbsp; {a.points}
                    </div>
                  </div>
                  <div className="ms-2 d-inline-flex align-items-center gap-2">
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-5 text-secondary" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
