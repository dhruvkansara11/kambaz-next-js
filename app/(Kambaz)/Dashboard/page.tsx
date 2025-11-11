"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Card, Button, FormControl, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addEnrollment, removeEnrollment } from "./Enrollments/reducer";
import { redirect } from "next/navigation";
import coursesData from "../Database/courses.json";

type Course = {
  _id: string;
  number?: string;
  name: string;
  description: string;
  img?: string;
  startDate?: string;
  endDate?: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    redirect("/Account/Signin");
  }

  const studentView = currentUser.role === "STUDENT";
  const facultyView = currentUser.role === "FACULTY";

  const [showEnrollments, setShowEnrollments] = useState(false);

  // Local course state for add/edit
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    img: "/images/reactjs.png",
    description: "New Description",
  });

  const list = courses.length ? courses : (coursesData as Course[]);

  const handleAddCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCourse = { ...course, _id: uuidv4() };
    dispatch(addNewCourse(newCourse));
    dispatch(
      addEnrollment({
        _id: uuidv4(),
        user: currentUser._id,
        course: newCourse._id,
      })
    );
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      img: "/images/reactjs.png",
      description: "New Description",
    });
  };

  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  const handleDeleteCourse = (id: string) => {
    dispatch(deleteCourse(id));
  };

  const handleEnroll = (courseId: string) => {
    dispatch(
      addEnrollment({
        _id: uuidv4(),
        user: currentUser._id,
        course: courseId,
      })
    );
  };

  const handleUnenroll = (courseId: string) => {
    const enrollment = enrollments.find(
      (en: any) => en.user === currentUser._id && en.course === courseId
    );
    if (enrollment) {
      dispatch(removeEnrollment(enrollment));
    }
  };

  return (
    <Container id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* FACULTY VIEW - Add/Edit Courses */}
      {!studentView && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      {/* STUDENT VIEW - Toggle Enrollments */}
      <h2 id="wd-dashboard-published">
        Published Courses (
        {
          list.filter((course: any) =>
            enrollments.some(
              (en: any) =>
                en.course === course._id && en.user === currentUser._id
            )
          ).length
        }
        )
        {studentView && (
          <Button
            variant="primary"
            className="float-end"
            style={{ marginTop: "-4px" }}
            onClick={() => setShowEnrollments(!showEnrollments)}
          >
            Enrollments
          </Button>
        )}
      </h2>

      <hr />

      <Row className="g-4" xs={1} md={5}>
        {list
          .filter((course: any) =>
            showEnrollments
              ? true
              : enrollments.some(
                  (en: any) =>
                    en.user === currentUser._id && en.course === course._id
                )
          )
          .map((course: Course) => {
            const isEnrolled = enrollments.some(
              (en: any) =>
                en.user === currentUser._id && en.course === course._id
            );

            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: 300 }}
              >
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled) e.preventDefault();
                  }}
                >
                  <Card className="h-100">
                    {course.img ? (
                      <Image
                        src={course.img}
                        alt={course.number ? `${course.number} ${course.name}` : course.name}
                        width={600}
                        height={320}
                        style={{ width: "100%", height: 160, objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ height: 160, background: "#c7d5e0" }} />
                    )}

                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: 100 }}
                      >
                        {course.description}
                      </Card.Text>

                      {/* STUDENT VIEW */}
                      {studentView && showEnrollments && !isEnrolled && (
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnroll(course._id);
                          }}
                        >
                          Enroll
                        </Button>
                      )}

                      {studentView && showEnrollments && isEnrolled && (
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnenroll(course._id);
                          }}
                        >
                          Unenroll
                        </Button>
                      )}

                      {!showEnrollments && <Button variant="primary">Go</Button>}

                      {/* FACULTY VIEW */}
                      {facultyView && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
