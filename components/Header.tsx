"use client";
import Link from "next/link";
export default function Header() {
  return (
    <Link href={"/"} className="text-3xl font-bold">
      {" "}
      WordWise
    </Link>
  );
}
