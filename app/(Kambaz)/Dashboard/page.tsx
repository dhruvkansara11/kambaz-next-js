// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";

// export default function Dashboard() {
//   const courses = [
//     {
//       id: "1234",
//       img: "/image2.jpeg",
//       title: "CS1234 React JS",
//       desc: "Full Stack Software Developer",
//     },
//     {
//       id: "5130",
//       img: "/image3.jpeg",
//       title: "CS5130 Applied Programming and Data Processing for AI",
//       desc: "Lecture • Computer Science",
//     },
//     {
//       id: "5200",
//       img: "/image4.jpeg",
//       title: "CS5200 Database Management Systems",
//       desc: "SQL • Modeling • Indexes",
//     },
//     {
//       id: "5800",
//       img: "/image5.jpeg",
//       title: "CS5800 Algorithms",
//       desc: "Design & Analysis",
//     },
//     {
//       id: "5500",
//       img: "/image6.jpeg",
//       title: "CS5500 Software Engineering",
//       desc: "Process • Testing • CI/CD",
//     },
//     {
//       id: "5010",
//       img: "/image7.jpeg",
//       title: "CS5010 Programming Design Paradigm",
//       desc: "Java • Swing • JUnit",
//     },
//     {
//       id: "5700",
//       img: "/image8.jpeg",
//       title: "CS5700 Fundamentals of Computer Networking",
//       desc: "Lecture • Computer Science",
//     },
//   ];

//   return (
//     <div id="wd-dashboard" className="p-4">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
//       <hr />

//       <Container fluid>
//         <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//           {courses.map((course) => (
//             <Col key={course.id} className="wd-dashboard-course">
//               <Card className="h-100 shadow-sm border-0">
//                 <Link
//                   href={`/Courses/${course.id}/Home`}
//                   className="wd-dashboard-course-link text-decoration-none text-dark"
//                 >
//                   <Image
//                     src={course.img}
//                     alt={course.title}
//                     width={400}
//                     height={200}
//                     className="card-img-top rounded-0"
//                   />
//                   <Card.Body>
//                     <Card.Title className="fw-bold text-nowrap overflow-hidden">
//                       {course.title}
//                     </Card.Title>
//                     <Card.Text
//                       className="text-secondary overflow-hidden"
//                       style={{ height: "60px" }}
//                     >
//                       {course.desc}
//                     </Card.Text>
//                     <Button variant="primary" className="w-100">
//                       Go
//                     </Button>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from "react-bootstrap";
import courses from "../Database/courses.json";


type Course = {
    _id: string;
    number?: string;
    name: string;
    description: string;
    img?: string;
};

export default function Dashboard() {
    const list = courses as Course[];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({list.length})
            </h2>
            <hr />

            <Row className="g-4" xs={1} md={5}>
                {list.map((course) => (
                    <Col key={course._id} className="wd-dashboard-course" style={{ width: 300 }}>
                        <Link
                            href={`/Courses/${course._id}/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
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
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
