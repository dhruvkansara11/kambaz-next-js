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