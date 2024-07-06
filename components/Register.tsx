import register from "@/app/actions/register";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPasssword] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const handleRegister = async () => {
    if (!username || !password || username == "" || password == "") {
      window.alert("Username and Password required");
    }
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("username", username);
    formData.append("password", password);
    try {
      const { status, message } = await register(formData);
      if (status === 200) {
        toast.success(message, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        const res = await signIn("credentials", {
          username: username,
          password: password,
          redirect: false,
        });
        console.log(res);
      } else {
        toast.error(message, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      window.alert("There was an error");
    } finally {
      router.push("/api/auth");
    }
  };
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="w-full h-[40.9rem] bg-main-bg  overflow-hidden font-sans">
      <div className="absolute h-80 w-[30rem]  top-44 left-[34rem] p-10">
        <h2 className="font-sans font-bold text-xl text-center mb-10">
          Register
        </h2>
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
        <input
          type="file"
          name="file"
          id="file"
          className="w-full h-10 pl-5 rounded-md mb-10 border border-black"
          onChange={(e) => handleImage(e)}
          accept="image/*"
        />
        <button
          className="w-full h-10 rounded-md bg-indigo-400 text-white font-bold"
          onClick={() => {
            handleRegister();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
