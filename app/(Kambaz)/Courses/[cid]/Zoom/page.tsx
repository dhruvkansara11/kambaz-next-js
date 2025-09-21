import { redirect } from "next/navigation";

const ZOOM_BY_COURSE: Record<string, string> = {
  "1234": process.env.NEXT_PUBLIC_ZOOM_1234 ?? "https://zoom.us/j/123456789",
};

export default function ZoomRedirect({ params }: { params: { cid: string } }) {
  const url = ZOOM_BY_COURSE[params.cid] ?? "https://zoom.us";
  redirect(url); 
}