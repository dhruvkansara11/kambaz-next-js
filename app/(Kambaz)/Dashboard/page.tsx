"use client";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import * as client from "../Courses/client";

import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
import { setEnrollments } from "../Courses/[cid]/People/reducer";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  // Check if current user is faculty
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // State to toggle between showing enrolled courses (default) or all courses
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.webp",
    description: "New Description",
  });

  // Fetch courses based on current mode using CLIENT REST APIs
  const fetchCourses = async () => {
    try {
      let fetchedCourses;

      if (showAllCourses) {
        // When showing all courses, we need to know which ones user is enrolled in
        const fetchedEnrollments = await client.findEnrollmentsForUser(
          currentUser._id
        );
        console.log("Fetched enrollments from server:", fetchedEnrollments);

        // Store enrolled course IDs for checking enrollment status
        const enrolledIds = fetchedEnrollments.map((course: any) =>
          typeof course === "string" ? course : course._id
        );
        setEnrolledCourseIds(enrolledIds);

        // IMPORTANT: Update Redux with the course objects, not old enrollment format
        dispatch(setEnrollments(fetchedEnrollments));

        // Fetch all courses for enrollment view
        fetchedCourses = await client.fetchAllCourses();
      } else {
        // Default: Fetch only enrolled courses for current user
        fetchedCourses = await client.findMyCourses();
        console.log("my courses: ", fetchedCourses)
        // IMPORTANT: Update Redux with the course objects
        dispatch(setEnrollments(fetchedCourses));

        // When showing only enrolled courses, all displayed courses are enrolled
        const enrolledIds = fetchedCourses.map((course: any) => course._id);
        setEnrolledCourseIds(enrolledIds);
      }

      console.log("Fetched courses:", fetchedCourses);
      console.log(
        "showAllcourses: ",
        showAllCourses,
        "; fetched courses: ",
        fetchedCourses
      );
      dispatch(setCourses(fetchedCourses));
    } catch (error) {
      console.log(error);
    }
  };

  // adding course using api
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  const handleEnroll = async (courseId: string) => {
    console.log("Dashboard - Enrolling in course:", courseId);
    await client.enrollIntoCourse(currentUser._id, courseId);
    // Add the newly enrolled course ID immediately
    setEnrolledCourseIds((prev) => [...prev, courseId]);

    // Update Redux enrollments to include the new course
    const enrolledCourse = courses.find((c: any) => c._id === courseId);
    console.log(
      "Dashboard - Found course to add to enrollments:",
      enrolledCourse
    );
    if (enrolledCourse) {
      const newEnrollments = [...enrollments, enrolledCourse];
      console.log("Dashboard - Updating enrollments to:", newEnrollments);
      dispatch(setEnrollments(newEnrollments));
    }

    await fetchCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    const status = await client.unenrollFromCourse(currentUser._id, courseId);
    console.log(courseId, ", ", status);
    // Remove the unenrolled course ID immediately
    setEnrolledCourseIds((prev) => prev.filter((id) => id !== courseId));

    // Update Redux enrollments to remove the course
    dispatch(
      setEnrollments(
        enrollments.filter((e: any) => {
          if (e._id) return e._id !== courseId;
          if (e.course) return e.course !== courseId;
          return e !== courseId;
        })
      )
    );

    await fetchCourses();
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser, showAllCourses]);

  // Helper function to check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {/* Only show course creation/editing for faculty and only when viewing enrolled courses */}
      {isFaculty && !showAllCourses && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
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
            value={course.description}
            aria-rowspan={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length}){/* Enrollments toggle button */}
        <Button
          variant="primary"
          className="float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-btn"
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </Button>
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any, index: number) => {
            const isUserEnrolled = enrolledCourseIds.includes(course._id);
            const canNavigate = !showAllCourses || isUserEnrolled;

            console.log(
              `Course ${course._id}: enrolled=${isUserEnrolled}, canNavigate=${canNavigate}, showAllCourses=${showAllCourses}`
            );

            return (
              <Col
                key={index}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={canNavigate ? `/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!canNavigate) {
                        e.preventDefault();
                        alert("You must enroll in this course to access it.");
                      }
                    }}
                  >
                    <CardImg
                      src={course.image}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      <Button variant="primary"> Go </Button>

                      {/* Show Enroll/Unenroll buttons when in enrollments mode */}
                      {showAllCourses && (
                        <>
                          {isUserEnrolled ? (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                              className="btn btn-danger float-end"
                              id="wd-unenroll-course-click"
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
                              }}
                              className="btn btn-success float-end"
                              id="wd-enroll-course-click"
                            >
                              Enroll
                            </button>
                          )}
                        </>
                      )}

                      {/* Only show delete/edit buttons for faculty when NOT in enrollments mode */}
                      {isFaculty && !showAllCourses && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}