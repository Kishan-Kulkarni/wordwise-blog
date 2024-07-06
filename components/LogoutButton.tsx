"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="w-60 h-10 rounded-md bg-indigo-400 text-white font-bold"
      onClick={() => {
        signOut();
        router.refresh();
      }}
    >
      Logout
    </button>
  );
}
