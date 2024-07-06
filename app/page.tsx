import AllBlogs from "@/components/AllBlogs";
import Main from "@/components/Main";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("Session ", session);
  return (
    <div className="font-sans">
      <Main></Main>
      <AllBlogs></AllBlogs>
    </div>
  );
}
