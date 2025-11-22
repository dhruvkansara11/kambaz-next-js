"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Redirect based on login status
  if (currentUser) {
    redirect("/Account/Profile");
  } else {
    redirect("/Account/Signin");
  }

  // Optional fallback UI (will rarely render)
  return null;
}
