"use client";

import { useState } from "react";

export default function AssignmentEditor({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  const [assignees, setAssignees] = useState<string[]>(["Everyone"]);

  const handleAssigneesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setAssignees(selected);
  };

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Assignment Name */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-name" className="col-form-label">
            Assignment Name
          </label>
        </div>
        <div className="col-sm-9">
          <input id="wd-name" className="form-control" defaultValue="A1 - ENV + HTML" />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-4 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-description" className="col-form-label">
            Description
          </label>
        </div>
        <div className="col-sm-9">
          <div className="form-control" style={{ minHeight: 160 }}>
            <p className="mb-2">
              The assignment is available online. Submit a link to the landing page of your Web application running on
              Netlify.
            </p>
            <ul className="mb-2">
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kanbas application</li>
              <li>Links to all relevant source code repositories</li>
            </ul>
            <p className="mb-0">
              The Kanbas application should include a link to navigate back to the landing page.
            </p>
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-points" className="col-form-label">
            Points
          </label>
        </div>
        <div className="col-sm-9">
          <input id="wd-points" type="number" className="form-control" defaultValue={100} />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-assignment-group" className="col-form-label">
            Assignment Group
          </label>
        </div>
        <div className="col-sm-9">
          <select id="wd-assignment-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-display-grade-as" className="col-form-label">
            Display Grade as
          </label>
        </div>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Letter Grade">Letter Grade</option>
            <option value="GPA">GPA</option>
          </select>
        </div>
      </div>

      {/* Submission Type + Online Entry Options */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-submission-type" className="col-form-label">
            Submission Type
          </label>
        </div>
        <div className="col-sm-9">
          <select id="wd-submission-type" className="form-select mb-2" defaultValue="Online">
            <option value="Online">Online</option>
            <option value="On Paper">On Paper</option>
            <option value="No Submission">No Submission</option>
          </select>

          <div className="border rounded p-3">
            <div className="fw-semibold mb-2">Online Entry Options</div>

            {[
              { id: "wd-text-entry", label: "Text Entry" },
              { id: "wd-website-url", label: "Website URL" },
              { id: "wd-media-recordings", label: "Media Recordings" },
              { id: "wd-student-annotation", label: "Student Annotation" },
              { id: "wd-file-uploads", label: "File Uploads" },
            ].map((opt) => (
              <div className="form-check mb-1" key={opt.id}>
                <input className="form-check-input" type="checkbox" id={opt.id} defaultChecked />
                <label className="form-check-label" htmlFor={opt.id}>
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Section */}
      <div className="row mb-3 align-items-start">
        <div className="col-sm-3 text-sm-end">
          <label className="col-form-label">Assign</label>
        </div>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            {/* Assign To */}
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label">
                Assign to
              </label>
              <select
                id="wd-assign-to"
                className="form-select"
                multiple
                value={assignees}
                onChange={handleAssigneesChange}
              >
                <option value="Everyone">Everyone</option>
                <option value="Section A">Section A</option>
                <option value="Section B">Section B</option>
                <option value="Section C">Section C</option>
              </select>

              {/* Canvas-style chips */}
              <div className="mt-2">
                {assignees.map((a) => (
                  <span key={a} className="badge bg-light text-dark me-2">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="wd-due-date" className="form-label">
                  Due
                </label>
                <input
                  id="wd-due-date"
                  type="datetime-local"
                  className="form-control"
                  defaultValue="2024-05-13T23:59"
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="wd-available-from" className="form-label">
                      Available from
                    </label>
                    <input
                      id="wd-available-from"
                      type="datetime-local"
                      className="form-control"
                      defaultValue="2024-05-06T12:00"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="wd-available-until" className="form-label">
                      Until
                    </label>
                    <input
                      id="wd-available-until"
                      type="datetime-local"
                      className="form-control"
                      defaultValue="2024-05-20T12:00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col-sm-9 offset-sm-3">
          <button type="button" id="wd-cancel" className="btn btn-light me-2">
            Cancel
          </button>
          <button type="button" id="wd-save" className="btn btn-danger">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
