"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPasssword] = useState<string>("");
  const router = useRouter();
  const session = useSession();
  if (session.data) {
    router.replace("/");
    router.refresh();
  }
  const loginUser = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    console.log(res);
    router.replace("/");
    router.refresh();
  };
  return (
    <div className="w-full h-[40.9rem] bg-main-bg  overflow-hidden font-sans">
      <div className="absolute h-80 w-[30rem]  top-44 left-[34rem] p-10">
        <h2 className="font-sans font-bold text-xl text-center mb-10">Login</h2>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="w-full h-10 pl-5 rounded-md mb-5 border border-black"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="w-full h-10 pl-5 rounded-md mb-10 border border-black"
          autoComplete="off"
          value={password}
          onChange={(e) => setPasssword(e.target.value)}
        />
        <button
          className="w-full h-10 rounded-md bg-indigo-400 text-white font-bold"
          onClick={(e) => {
            loginUser(e as React.MouseEvent<HTMLInputElement>);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
