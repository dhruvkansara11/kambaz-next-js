"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";

import {
  addNewCourse,
  deleteCourse as deleteCourseAction,
  updateCourse as updateCourseAction,
  setCourses,
} from "../Courses/reducer";

import {
  setEnrollments,
  enroll,
  unenroll,
} from "../Enrollments/reducer";

import { useAppDispatch, useAppSelector } from "../hooks";
import * as client from "../Courses/client";

type Course = {
  _id: string;
  number: string;
  name: string;
  description: string;
  img: string;
};

type User = { _id: string; role: "STUDENT" | "FACULTY" | "TA" } | null;

const NEW_TEMPLATE: Course = {
  _id: "0",
  number: "New Number",
  name: "New Course",
  description: "New Description",
  img: "/images/react.png",
};

export default function Dashboard() {
  const dispatch = useAppDispatch();

  // Redux selectors
const courses = useAppSelector((s) => s.coursesReducer.courses) as Course[];

const enrollState = useAppSelector((s) => s.enrollmentsReducer.items);

const currentUser = useAppSelector((s) => s.accountReducer.currentUser) as User;

  // Staff logic
  const isStaff =
    !!currentUser &&
    (currentUser.role === "FACULTY" || currentUser.role === "TA");

  // Toggle enrolled/all courses
  const [showOnlyMyEnrollments, setShowOnlyMyEnrollments] = useState(true);

  // Local edit course
  const [course, setCourse] = useState<Course>({ ...NEW_TEMPLATE });

  // -------------- LOAD COURSES FROM SERVER --------------
  useEffect(() => {
    const load = async () => {
      try {
        const data = await client.fetchAllCourses();
        dispatch(setCourses(data));
      } catch (e) {
        console.error("Failed to load courses", e);
      }
    };
    load();
  }, [dispatch]);

  // -------------- LOAD USER ENROLLMENTS --------------
  useEffect(() => {
    if (!currentUser) return;
    const load = async () => {
      try {
        const data = await client.fetchMyEnrollments();
        dispatch(
          setEnrollments(
            data.map((e: any) => ({
              user: e.user,
              course: e.course,
            }))
          )
        );
      } catch (e) {
        console.error("Failed to load enrollments", e);
      }
    };
    load();
  }, [currentUser, dispatch]);

  // -------------- FILTER COURSES --------------
  const visible = useMemo(() => {
    if (!currentUser) return courses;
    if (!showOnlyMyEnrollments) return courses;

    return courses.filter((c) =>
      enrollState.some(
        (e) => e.user === currentUser._id && e.course === c._id
      )
    );
  }, [courses, enrollState, showOnlyMyEnrollments, currentUser]);

  const isEnrolled = (cid: string) =>
    !!currentUser &&
    enrollState.some((e) => e.user === currentUser._id && e.course === cid);

  // -------------- CRUD --------------
  const addCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(addNewCourse(newCourse));
      setCourse({ ...NEW_TEMPLATE });
    } catch (e) {
      console.error("Create failed", e);
    }
  };

  const updateCourse = async () => {
    try {
      const updated = await client.updateCourse(course);
      dispatch(updateCourseAction(updated));
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await client.deleteCourse(id);
      dispatch(deleteCourseAction(id));
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  // -------------- ENROLL / UNENROLL --------------
  const toggleEnrollment = async (cid: string) => {
    if (!currentUser) return;

    try {
      if (isEnrolled(cid)) {
        await client.unenrollFromCourse(cid);
        dispatch(unenroll({ user: currentUser._id, course: cid }));
      } else {
        await client.enrollInCourse(cid);
        dispatch(enroll({ user: currentUser._id, course: cid }));
      }
    } catch (err) {
      console.error("Enroll toggle failed", err);
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>

        {currentUser && (
          <Button
            variant="primary"
            id="wd-enrollments-toggle"
            onClick={() => setShowOnlyMyEnrollments((v) => !v)}
          >
            {showOnlyMyEnrollments ? "Show All Courses" : "My Enrollments"}
          </Button>
        )}
      </div>

      <hr />

      {/* STAFF — Add/Edit course */}
      {isStaff && (
        <>
          <h5 className="d-flex align-items-center justify-content-between">
            <span>New Course</span>
            <span>
              <ButtonGroup className="gap-2">
                <Button
                  id="wd-update-course-click"
                  variant="warning"
                  onClick={updateCourse}
                >
                  Update
                </Button>
                <Button
                  id="wd-add-new-course-click"
                  variant="primary"
                  onClick={addCourse}
                >
                  Add
                </Button>
              </ButtonGroup>
            </span>
          </h5>

          <FormControl
            className="mb-2"
            value={course.name}
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
          />
          <FormControl
            as="textarea"
            rows={3}
            className="mb-3"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      {/* COURSE LIST */}
      <h2 id="wd-dashboard-published">
        Published Courses ({visible.length})
      </h2>

      <hr />

      <Row className="g-4" xs={1} md={5}>
        {visible.map((c) => {
          const enrolled = isEnrolled(c._id);

          return (
            <Col key={c._id} style={{ width: 300 }}>
              <Link
                href={`/Courses/${c._id}/Home`}
                className="text-decoration-none text-dark"
                onClick={(e) => {
                  if (!isStaff && !enrolled) e.preventDefault();
                }}
              >
                <Card className="h-100">
                  {c.img ? (
                    <Image
                      src={c.img}
                      alt={c.name}
                      width={600}
                      height={320}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 160,
                        background: "#c7d5e0",
                      }}
                    />
                  )}

                  <Card.Body>
                    <Card.Title className="text-nowrap overflow-hidden">
                      {c.name}
                    </Card.Title>

                    <Card.Text
                      className="overflow-hidden"
                      style={{ height: 100 }}
                    >
                      {c.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="primary">Go</Button>

                      {isStaff ? (
                        <ButtonGroup className="gap-2">
                          <Button
                            variant="warning"
                            id="wd-edit-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            id="wd-delete-course-click"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(c._id);
                            }}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      ) : currentUser ? (
                        <Button
                          variant={enrolled ? "danger" : "success"}
                          id={enrolled ? "wd-unenroll-click" : "wd-enroll-click"}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleEnrollment(c._id);
                          }}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      ) : null}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
