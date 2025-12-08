"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import ModulesControls from "./ModulesControls";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import "../../../styles.css";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import * as client from "../../client";

import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";

import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    // @ts-ignore
    const module = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, module]));
  };

  const onRemoveModule = async (moduleId: string) => {
    // @ts-ignore
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    // @ts-ignore
    await client.updateModule(cid, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const [moduleName, setModuleName] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {isFaculty && (
        // @ts-ignore
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        // @ts-ignore
        {modules.map((module, index) => (
          <ListGroupItem
            key={index}
            className="wd-module p-0 mb-4 fs-5 border-gray"
          >
            {/* =======================
                 MODULE HEADER
               ======================= */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {/* Module Name */}
              {!module.editing && (
                <span className="fw-bold">{module.name}</span>
              )}

              {/* Editing Input */}
              {module.editing && isFaculty && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}

              {/* Module Buttons */}
              {isFaculty && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId: string) => onRemoveModule(moduleId)}
                  editModule={(moduleId: string) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {/* =======================
                 MODULE DESCRIPTION
               ======================= */}
            {module.description && (
              <div className="p-3 ps-4 bg-light text-muted border-bottom">
                <div className="fw-semibold">Description:</div>
                <div>{module.description}</div>
              </div>
            )}

            {/* =======================
                 LESSONS
               ======================= */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, idx: number) => (
                  <ListGroupItem key={idx} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    {isFaculty && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
