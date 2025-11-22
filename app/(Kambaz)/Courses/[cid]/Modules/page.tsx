"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    ListGroup,
    ListGroupItem,
    FormControl,
    Container,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

import {
    editModule,
    updateModule as updateModuleAction,
    setModules,
} from "./reducer";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as client from "../../client";

type Lesson = { _id: string; name: string; description: string; module: string };

type Module = {
    _id: string;
    course: string;
    name: string;
    description: string;
    lessons: Lesson[];
    editing?: boolean;
};

type User = { role?: "STUDENT" | "FACULTY" | "TA" } | null;

export default function Modules() {
    const { cid } = useParams() as { cid: string };

    const dispatch = useAppDispatch();

    // Redux state
    const modules = useAppSelector((s) => s.modulesReducer.modules) as Module[];
    const currentUser = useAppSelector((s) => s.accountReducer.currentUser) as User;

    const [moduleName, setModuleName] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const isStaff =
        !!currentUser &&
        (currentUser.role === "FACULTY" || currentUser.role === "TA");

    // ------------------------------------------------------
    //  LOAD MODULES FROM SERVER FOR THIS COURSE
    // ------------------------------------------------------
    useEffect(() => {
        const load = async () => {
            const data = await client.findModulesForCourse(cid);
            dispatch(setModules(data));
        };
        load();
    }, [cid, dispatch]);

    // ------------------------------------------------------
    //  CREATE MODULE (SERVER)
    // ------------------------------------------------------
    const onCreateModule = async () => {
        if (!moduleName.trim()) return;

        const newModule = await client.createModuleForCourse(cid, {
            name: moduleName.trim(),
            description: "",
        });

        dispatch(setModules([...modules, newModule]));
        setModuleName("");
    };

    // ------------------------------------------------------
    //  DELETE MODULE (SERVER)
    // ------------------------------------------------------
    const onDeleteModule = async (id: string) => {
        await client.deleteModule(id);
        dispatch(setModules(modules.filter((m) => m._id !== id)));
    };

    // ------------------------------------------------------
    // UPDATE MODULE (SERVER)
    // ------------------------------------------------------
    const onUpdateModule = async (module: Module) => {
        const updated = await client.updateModule(module);
        dispatch(
            setModules(
                modules.map((m) => (m._id === updated._id ? updated : m))
            )
        );
    };

    // Collapse toggle
    const toggleCollapse = () => setCollapsed((v) => !v);

    return (
        <Container>
            {/* STAFF-ONLY CONTROLS */}
            {isStaff && (
                <>
                    <ModulesControls
                        moduleName={moduleName}
                        setModuleName={setModuleName}
                        addModule={onCreateModule}
                        onCollapseAll={toggleCollapse}
                    />
                    <br />
                    <br />
                    <br />
                </>
            )}

            {/* MODULE LIST */}
            <ListGroup className="rounded-0" id="wd-modules">
                {modules.length === 0 ? (
                    <p className="text-muted ms-3">No modules found.</p>
                ) : (
                    modules.map((module, mIdx) => (
                        <ListGroupItem
                            key={module._id}
                            className="wd-module p-0 mb-5 fs-5 border-gray"
                        >
                            {/* -------------------------
                                MODULE HEADER
                            -------------------------- */}
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />

                                    {/* Normal view */}
                                    {!module.editing && (
                                        <span className="flex-grow-1">
                                            {mIdx + 1}. {module.name}
                                        </span>
                                    )}

                                    {/* Editing mode */}
                                    {module.editing && (
                                        <FormControl
                                            className="w-50 d-inline-block"
                                            value={module.name}
                                            disabled={!isStaff}
                                            onChange={(e) =>
                                                dispatch(
                                                    updateModuleAction({
                                                        ...module,
                                                        name: e.target.value,
                                                    })
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onUpdateModule({
                                                        ...module,
                                                        editing: false,
                                                    });
                                                }
                                            }}
                                        />
                                    )}
                                </div>

                                {/* STAFF ONLY: Edit/Delete */}
                                {isStaff && (
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={onDeleteModule}
                                        editModule={(id) =>
                                            dispatch(editModule(id))
                                        }
                                    />
                                )}
                            </div>

                            {/* -------------------------
                                LESSONS
                            -------------------------- */}
                            {!collapsed &&
                                module.lessons &&
                                module.lessons.length > 0 && (
                                    <ListGroup className="wd-lessons rounded-0">
                                        {module.lessons.map(
                                            (lesson: Lesson, lIdx: number) => (
                                                <ListGroupItem
                                                    key={lesson._id}
                                                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                                                >
                                                    <BsGripVertical className="me-2 fs-3" />
                                                    <span className="flex-grow-1">
                                                        {mIdx + 1}.{lIdx + 1}{" "}
                                                        {lesson.name}
                                                    </span>

                                                    {isStaff && (
                                                        <LessonControlButtons />
                                                    )}
                                                </ListGroupItem>
                                            )
                                        )}
                                    </ListGroup>
                                )}
                        </ListGroupItem>
                    ))
                )}
            </ListGroup>
        </Container>
    );
}
