"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../client";
import PeopleTable from "./Table/page";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state: any) => state.accountReducer);


  const fetchUsersForCourse = async () => {
    if (!cid) return;

    try {
      setLoading(true);
      const courseUsers = await client.findUsersForCourse(cid as string);
      setUsers(courseUsers || []);
    } catch (error) {
      console.error("Error fetching users for course:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  if (loading) {
    return (
      <div className="p-4">
        <h3>Loading course participants...</h3>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="p-4">
        <h3>People</h3>
        <p>No users enrolled in this course yet.</p>
      </div>
    );
  }

  return (
    <div id="wd-people" className="p-4">
      <h3>People ({users.length})</h3>

      {/* Pass refresh callback to child */}
      <PeopleTable users={users} refreshUsers={fetchUsersForCourse} />
    </div>
  );
}
