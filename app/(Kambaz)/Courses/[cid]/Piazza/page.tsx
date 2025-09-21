import { redirect } from "next/navigation";

const PIAZZA_BY_COURSE: Record<string, string> = {
  "1234": process.env.NEXT_PUBLIC_PIAZZA_1234 ?? "https://piazza.com",
};

export default function PiazzaRedirect({ params }: { params: { cid: string } }) {
  const url = PIAZZA_BY_COURSE[params.cid] ?? "https://piazza.com";
  redirect(url);
}