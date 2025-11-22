"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, redirect } from "next/navigation";
import Link from "next/link";

import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
    addAssignment,
    updateAssignment as updateAssignmentAction,
} from "../reducer";

import * as client from "../../../client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams() as { cid: string; aid: string };
    const dispatch = useAppDispatch();

    // ---------------- Redux State ----------------
    const currentUser = useAppSelector(
        (s) => s.accountReducer.currentUser
    ) as { role?: string } | null;

    const existing = useAppSelector((s) =>
        s.assignmentsReducer.assignments.find(
            (a) => a._id === aid && a.course === cid
        )
    );

    const canEdit =
        !!currentUser &&
        (currentUser.role === "FACULTY" || currentUser.role === "TA");

    const isNew = aid === "New";

    // ---------------- Form State ----------------
    const [title, setTitle] = useState(existing?.title ?? "New Assignment");
    const [description, setDescription] = useState(existing?.description ?? "");
    const [points, setPoints] = useState<number>(existing?.points ?? 100);

    const [assignees, setAssignees] = useState<string[]>(["Everyone"]);
    const handleAssigneesChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setAssignees(Array.from(e.target.selectedOptions, (o) => o.value));

    const [due, setDue] = useState<string>(
        (existing?.due ? existing.due : new Date().toISOString()).slice(0, 16)
    );
    const [availableFrom, setAvailableFrom] = useState<string>(
        (existing?.availableFrom ?? "").slice(0, 16)
    );

    const disabled = useMemo(() => !canEdit, [canEdit]);

    // Redirect if not authorized to create new
    useEffect(() => {
        if (isNew && !canEdit) {
            redirect(`/Courses/${cid}/Assignments`);
        }
    }, [isNew, canEdit, cid]);

    if (!isNew && !existing) {
        return <div className="text-muted">Assignment not found.</div>;
    }

    // ---------------- Save Handler ----------------
    const onSave = async () => {
        if (!canEdit) return;

        const payload = {
            course: cid,
            title,
            description,
            points,
            due: new Date(due).toISOString(),
            availableFrom: availableFrom
                ? new Date(availableFrom).toISOString()
                : undefined,
        };

        if (isNew) {
            const created = await client.createAssignmentForCourse(cid, payload);
            dispatch(addAssignment(created));
        } else if (existing) {
            const updatedToSend = { _id: existing._id, ...payload };
            const updatedFromServer = await client.updateAssignmentOnServer(
                updatedToSend
            );
            dispatch(updateAssignmentAction(updatedFromServer));
        }

        redirect(`/Courses/${cid}/Assignments`);
    };

    // ---------------- Render ----------------
    return (
        <div
            id="wd-assignments-editor"
            className="p-3"
            style={{ maxWidth: 720, margin: "0 auto" }}
        >
            {/* Assignment Name */}
            <div className="row mb-3 align-items-start">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="wd-name" className="col-form-label">
                        Assignment Name
                    </label>
                </div>
                <div className="col-sm-9">
                    <input
                        id="wd-name"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={disabled}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="row mb-4 align-items-start">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="wd-description" className="col-form-label">
                        Description
                    </label>
                </div>
                <div className="col-sm-9">
                    <textarea
                        id="wd-description"
                        className="form-control"
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={disabled}
                    />
                </div>
            </div>

            {/* Points */}
            <div className="row mb-3 align-items-start">
                <div className="col-sm-3 text-sm-end">
                    <label htmlFor="wd-points" className="col-form-label">
                        Points
                    </label>
                </div>
                <div className="col-sm-9">
                    <input
                        id="wd-points"
                        type="number"
                        className="form-control"
                        value={points}
                        onChange={(e) => setPoints(parseInt(e.target.value))}
                        disabled={disabled}
                    />
                </div>
            </div>

            {/* More form fields (unchanged) — same as your original */}
            {/* ... */}

            {/* Buttons */}
            <div className="row mt-4">
                <div className="col-sm-9 offset-sm-3 d-flex gap-2">
                    <Link
                        href={`/Courses/${cid}/Assignments`}
                        className="btn btn-light"
                    >
                        Cancel
                    </Link>
                    {canEdit && (
                        <button onClick={onSave} className="btn btn-danger">
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
