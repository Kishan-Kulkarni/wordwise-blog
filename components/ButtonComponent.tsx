"use client";
import { useRouter } from "next/navigation";
export default function ButtonComponent() {
  const router = useRouter();
  return (
    <>
      <button
        className="bg-indigo-400 w-24 text-white font-bold rounded-md h-10"
        onClick={() => {
          router.replace("/api/register");
        }}
      >
        Register
      </button>
      <button
        className="bg-indigo-400 w-24 text-white font-bold rounded-md h-10"
        onClick={() => {
          router.replace("/api/auth");
        }}
      >
        Login
      </button>
    </>
  );
}
