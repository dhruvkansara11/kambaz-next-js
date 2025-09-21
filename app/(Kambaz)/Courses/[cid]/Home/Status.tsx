export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>
      <button>Unpublish</button> <button>Publish</button>
        <button className="wd-btn wd-block">Import Existing Content</button>
        <button className="wd-btn wd-block">Import from Commons</button>
        <button className="wd-btn wd-block">Choose Home Page</button>
        <button className="wd-btn wd-block">View Course Stream</button>
        <button className="wd-btn wd-block">New Announcement</button>
        <button className="wd-btn wd-block">New Analytics</button>
      <button>View Course Notifications</button>
    </div>
  );
}
