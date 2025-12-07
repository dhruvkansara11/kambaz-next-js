"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment, setAssignments } from "./reducer";
import * as client from "../client";

// Static dropdown options
const assignToOptions = [
  { value: "everyone", label: "Everyone" },
  { value: "section1", label: "Section 1" },
  { value: "section2", label: "Section 2" },
  { value: "admin", label: "Admins Only" },
];

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Check if creating new assignment or editing existing
  const isNewAssignment = aid === "new";
  const existingAssignment = isNewAssignment
    ? null
    : assignments.find((a: any) => a._id === aid);

  // Form state
  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(
    existingAssignment?.description || ""
  );
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [group, setGroup] = useState(
    existingAssignment?.group || "ASSIGNMENTS"
  );
  const [displayGradeAs, setDisplayGradeAs] = useState(
    existingAssignment?.displayGradeAs || "Percentage"
  );
  const [submissionType, setSubmissionType] = useState(
    existingAssignment?.submissionType || "Online"
  );
  const [onlineEntryOptions, setOnlineEntryOptions] = useState<string[]>(
    existingAssignment?.onlineEntryOptions || []
  );

  const [dueDate, setDueDate] = useState<Date | null>(
    existingAssignment?.dueDate ? new Date(existingAssignment.dueDate) : null
  );
  const [availableFromDate, setAvailableFromDate] = useState<Date | null>(
    existingAssignment?.availableFrom
      ? new Date(existingAssignment.availableFrom)
      : null
  );
  const [untilDate, setUntilDate] = useState<Date | null>(
    existingAssignment?.untilDate
      ? new Date(existingAssignment.untilDate)
      : null
  );

  type AssignOption = {
    value: string;
    label: string;
  };

  const [selectedOptions, setSelectedOptions] = useState<AssignOption[]>(
    existingAssignment?.assignTo?.map((label: string) => ({
      value: label.toLowerCase().replace(/\s+/g, ""),
      label: label,
    })) || [assignToOptions[0]]
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      const fetchedAssignments = await client.findAssignmentsForCourse(
        cid as string
      );
      dispatch(setAssignments(fetchedAssignments));
    };
    fetchAssignments();
  }, [cid]);

  const handleCheckboxChange = (option: string) => {
    setOnlineEntryOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSave = async () => {
    const assignmentData = {
      _id: existingAssignment?._id,
      title,
      course: cid,
      description,
      points,
      dueDate: dueDate?.toISOString() || "",
      availableFrom: availableFromDate?.toISOString() || "",
      untilDate: untilDate?.toISOString() || "",
      group,
      displayGradeAs,
      submissionType,
      assignTo: selectedOptions.map((opt) => opt.label),
      onlineEntryOptions,
    };

    if (isNewAssignment) {
      const newAssignment = await client.createAssignment(
        cid as string,
        assignmentData
      );
      dispatch(setAssignments([...assignments, newAssignment]));
    } else {
      await client.updateAssignment(assignmentData);
      const updatedAssignments = assignments.map((a: any) =>
        a._id === assignmentData._id ? assignmentData : a
      );
      dispatch(setAssignments(updatedAssignments));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (!isNewAssignment && !existingAssignment) {
    return (
      <div className="p-3">
        <h4 className="text-danger">Assignment not found</h4>
        <p>
          No assignment found for ID &quot;{aid}&quot; in course &quot;{cid}
          &quot;.
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
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isStudent = currentUser?.role === "STUDENT";
  console.log("current user: ", currentUser, " ", isStudent);
  const isReadOnly = isStudent;
  return (
    <div id="wd-assignments-editor" className="p-3">
      {/* Assignment Name */}
      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isReadOnly}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isReadOnly}
        />
      </Form.Group>

      {/* Points */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Points
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            disabled={isReadOnly}
          />
        </Col>
      </Form.Group>

      {/* Assignment Group */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Assignment Group
        </Form.Label>
        <Col sm={4}>
          <Form.Select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            disabled={isReadOnly}
          >
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECTS</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {/* Display Grade As */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Display Grade as
        </Form.Label>
        <Col sm={4}>
          <Form.Select
            value={displayGradeAs}
            onChange={(e) => setDisplayGradeAs(e.target.value)}
            disabled={isReadOnly}
          >
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {/* Submission Type */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Submission Type
        </Form.Label>
        <Col sm={4} className="mt-2 p-3 border rounded">
          <Form.Select
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
            disabled={isReadOnly}
          >
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
                checked={onlineEntryOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                disabled={isReadOnly}
              />
            ))}
          </div>
        </Col>
      </Form.Group>

      {/* Assign Section */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Assign
        </Form.Label>
        <Col sm={6} className="p-3 border rounded">
          {/* Assign To */}
          <div className="mb-3">
            <Form.Label>Assign to</Form.Label>
            <Select
              value={selectedOptions}
              isMulti
              options={assignToOptions}
              classNamePrefix="select"
              placeholder="Select..."
              onChange={(opts) => setSelectedOptions(opts as AssignOption[])}
              isDisabled={isReadOnly}
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
              disabled={isReadOnly}
            />
          </div>

          {/* Available From and Until */}
          <Row>
            <Col>
              <Form.Label className="d-block">Available from</Form.Label>
              <DatePicker
                selected={availableFromDate}
                onChange={(date) => setAvailableFromDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy, h:mm aa"
                className="form-control"
                disabled={isReadOnly}
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
                disabled={isReadOnly}
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-end mt-4">
        {isStudent ? (
          <div className="text-muted">
            <em>
              View only - You do not have permission to edit this assignment
            </em>
          </div>
        ) : (
          <>
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
}