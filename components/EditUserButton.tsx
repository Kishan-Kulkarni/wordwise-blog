"use client";
import { useRouter } from "next/navigation";

export default function EditUserButton() {
  const router = useRouter();
  return (
    <button
      className="w-60 h-10 rounded-md bg-indigo-400 text-white font-bold mb-5"
      onClick={() => {
        router.push("/api/edit-user");
      }}
    >
      Edit User
    </button>
  );
}
