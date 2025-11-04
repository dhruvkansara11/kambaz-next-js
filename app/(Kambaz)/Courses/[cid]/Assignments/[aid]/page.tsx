"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

import * as db from "../../../../Database/index"; // explicit import

// Dropdown options
const assignToOptions = [
  { value: "everyone", label: "Everyone" },
  { value: "section1", label: "Section 1" },
  { value: "section2", label: "Section 2" },
  { value: "admin", label: "Admins Only" },
];

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // e.g., CS5200 + CS5200-A1
  const assignments = db.assignments || [];

  // Find current assignment
  const assignment = assignments.find((a) => a._id === aid);

  // Initialize date states (parse from JSON fields)
  const [dueDate, setDueDate] = useState<Date | null>(
    assignment?.due ? new Date(assignment.due) : null
  );
  const [availableFromDate, setAvailableFromDate] = useState<Date | null>(
    assignment?.availableFrom ? new Date(assignment.availableFrom) : null
  );
  const [untilDate, setUntilDate] = useState<Date | null>(
    assignment?.until ? new Date(assignment.until) : null
  );

  // Dropdown selection type
  const [selectedOptions, setSelectedOptions] = useState(
    assignment?.assignTo?.map((label) => ({
      value: label.toLowerCase().replace(/\s+/g, ""),
      label,
    })) || [assignToOptions[0]]
  );

  if (!assignment) {
    return (
      <div className="p-3">
        <h4 className="text-danger">Assignment not found</h4>
        <p>
          No assignment found for ID <b>{aid}</b> in course <b>{cid}</b>.
        </p>
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary mt-3"
        >
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      {/* ===== Assignment Name ===== */}
      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue={assignment.title} />
      </Form.Group>

      {/* ===== Description ===== */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          defaultValue={assignment.description}
        />
      </Form.Group>

      {/* ===== Points ===== */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={4}>
          <Form.Control type="number" defaultValue={assignment.points} />
        </Col>
      </Form.Group>

      {/* ===== Assignment Group ===== */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Assignment Group
        </Form.Label>
        <Col sm={4}>
          <Form.Select defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {/* ===== Display Grade As ===== */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Display Grade as
        </Form.Label>
        <Col sm={4}>
          <Form.Select defaultValue="Points">
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {/* ===== Submission Type ===== */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Submission Type
        </Form.Label>
        <Col sm={4} className="mt-2 p-3 border rounded">
          <Form.Select defaultValue="Online">
            <option>Online</option>
            <option>On Paper</option>
            <option>No Submission</option>
          </Form.Select>

          <div className="mt-2">
            <div className="fw-bold">Online Entry Options</div>
            {[
              "Text Entry",
              "Website URL",
              "Media Recordings",
              "Student Annotation",
              "File Uploads",
            ].map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                label={option}
                defaultChecked={
                  assignment?.onlineEntryOptions?.includes(option) || false
                }
              />
            ))}
          </div>
        </Col>
      </Form.Group>

      {/* ===== Assign Section ===== */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Assign
        </Form.Label>
        <Col sm={6} className="p-3 border rounded">
          {/* Assign To */}
          <div className="mb-3">
            <Form.Label>Assign to</Form.Label>
            <Select
              defaultValue={selectedOptions}
              isMulti
              options={assignToOptions}
              classNamePrefix="select"
              placeholder="Select..."
              onChange={(opts) => setSelectedOptions([...opts])} 
            />
          </div>

          {/* Due Date */}
          <div className="mb-3">
            <Form.Label className="d-block">Due</Form.Label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy, h:mm aa"
              className="form-control"
            />
          </div>

          {/* Available From / Until */}
          <Row>
            <Col>
              <Form.Label className="d-block">Available from</Form.Label>
              <DatePicker
                selected={availableFromDate}
                onChange={(date) => setAvailableFromDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy, h:mm aa"
                className="form-control"
              />
            </Col>
            <Col>
              <Form.Label className="d-block">Until</Form.Label>
              <DatePicker
                selected={untilDate}
                onChange={(date) => setUntilDate(date)}
                showTimeSelect
                placeholderText="Click to select a date"
                dateFormat="MMMM d, yyyy, h:mm aa"
                className="form-control"
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      {/* ===== Buttons ===== */}
      <div className="d-flex justify-content-end mt-4">
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
          Save
        </Link>
      </div>
    </div>
  );
}