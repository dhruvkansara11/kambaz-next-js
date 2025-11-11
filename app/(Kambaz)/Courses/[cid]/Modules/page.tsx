/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Container, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import "../../../styles.css";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const studentView = currentUser.role === "STUDENT";

  // Collapse all handler
  const handleCollapseAll = () => setCollapsed((prev) => !prev);

  // Filter modules for this course
  const filteredModules = modules.filter((module: any) => module.course === cid);

  return (
    <Container>
      {/* Faculty-only toolbar and input */}
      {!studentView && (
        <>
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={() => {
              dispatch(addModule({ name: moduleName, course: cid }));
              setModuleName("");
            }}
            onCollapseAll={handleCollapseAll}
          />
          <br />
          <br />
          <br />
        </>
      )}

      <ListGroup className="rounded-0" id="wd-modules">
        {filteredModules.length === 0 ? (
          <p className="text-muted ms-3">No modules found for this course.</p>
        ) : (
          filteredModules.map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              {/* Module Header */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing ? (
                    <>
                      <strong>{module.name}</strong>
                    </>
                  ) : (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>

                {/* Faculty-only control buttons */}
                {!studentView && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
              </div>

              {/* Lessons Section */}
              {!collapsed && module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" />
                        <strong>{lesson.name}</strong>
                        {lesson.description && (
                          <div className="text-muted small ps-4">
                            {lesson.description}
                          </div>
                        )}
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
    </Container>
  );
}
