"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import "../../../styles.css";

// Import from Database index.ts
import * as db from "../../../Database/index";

export default function Modules() {
  const { cid } = useParams(); // example: CS5200
  const modules = db.modules || []; // safeguard if undefined

  // collapsed = true → lessons hidden
  const [collapsed, setCollapsed] = useState(false);

  // Handlers
  const handleCollapseAll = () => setCollapsed((prev) => !prev);
  const handleViewProgress = () => alert("View progress feature coming soon!");
  const handlePublishAll = () => alert("Publish all feature coming soon!");
  const handleAddModule = () => alert("Add module feature coming soon!");

  // Filter only modules for this course
  const filteredModules = modules.filter((m) => m.course === cid);

  return (
    <div>
      {/* Toolbar */}
      <ModulesControls
        onCollapseAll={handleCollapseAll}
        onViewProgress={handleViewProgress}
        onPublishAll={handlePublishAll}
        onAddModule={handleAddModule}
      />

      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {filteredModules.length === 0 ? (
          <p className="text-muted ms-3">No modules found for this course.</p>
        ) : (
          filteredModules.map((module, index) => (
            <ListGroupItem
              key={index}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Header */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  <strong>{module.name}</strong>
                  <div className="text-light small ps-4">
                    {module.description}
                  </div>
                </div>
                <ModuleControlButtons />
              </div>

              {/* Lessons */}
              {!collapsed && module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson, lIndex) => (
                    <ListGroupItem
                      key={lIndex}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" />
                        <strong>{lesson.name}</strong>
                        <div className="text-muted small ps-4">
                          {lesson.description}
                        </div>
                      </div>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}