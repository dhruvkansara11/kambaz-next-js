"use client";
export default function AssignmentEditor({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />

      <br />
      <br />

      <textarea id="wd-description"rows={8} cols={50}>
        The assignment is available online Submit a link to the landing page of your Web
        application running on Netlify. The landing page should include the following:
        Your full name and section
        Links to each of the lab assignments
        Link to the Kanbas application
        Links to all relevant source code repositories
        The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
        <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
        <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
                <option value="Letter Grade">Letter Grade</option>
                <option value="GPA">GPA</option>
              </select>
            </td>
          </tr>
        <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No Submission">No Submission</option>
              </select>
              <div style={{ marginTop: 8 }}>
                <div>Online Entry Options</div>
                <label>
                  <input id="wd-text-entry" type="checkbox" defaultChecked/> Text Entry
                </label>
                <br />
                <label>
                  <input id="wd-website-url" type="checkbox" defaultChecked/> Website URL
                </label>
                <br />
                <label>
                  <input id="wd-media-recordings" type="checkbox" defaultChecked/> Media
                  Recordings
                </label>
                <br />
                <label>
                  <input id="wd-student-annotation" type="checkbox" defaultChecked/> Student
                  Annotation
                </label>
                <br />
                <label>
                  <input id="wd-file-uploads" type="checkbox" defaultChecked/> File Uploads
                </label>
              </div>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>
          <br />
        <tr>
          <td align="right" valign="top">
          </td>
          <td>
            <div style={{ display: "flex", gap: 28, marginBottom: 6 }}>
              <div style={{ width: 170 }}>Available from</div>
              <div style={{ width: 170 }}>Until</div>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" style={{ width: 170 }} />
              <input id="wd-available-until" type="date" defaultValue="2024-05-20" style={{ width: 170 }} />
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <br />
       <hr style={{ margin: "16px 0" }} />
      <button id="wd-cancel">Cancel</button>{" "}
      <button id="wd-save">Save</button>
    </div>
  );
}
