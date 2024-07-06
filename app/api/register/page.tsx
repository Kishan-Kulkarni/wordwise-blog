"use client";
import Register from "@/components/Register";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();
  return <>{!session.data ? <Register /> : router.push("/")}</>;
}
