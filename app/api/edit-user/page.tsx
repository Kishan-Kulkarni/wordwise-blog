"use client";
import editUser from "@/app/actions/editUser";
import ButtonComponent from "@/components/ButtonComponent";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function EditUser() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPasssword] = useState<string>("");
  const [newpassword, setNewPasssword] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const session = useSession();
  if (!session || !session.data?.user) {
    return (
      <div className="w-full h-[89vh] gap-5 bg-main-bg flex flex-row justify-center items-center">
        <ButtonComponent />
      </div>
    );
  }
  const handleEdit = async () => {
    if (
      !username ||
      !password ||
      !newpassword ||
      username == "" ||
      password == "" ||
      newpassword === ""
    ) {
      window.alert("Username and Passwords required");
    }
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("newpassword", newpassword);
    try {
      const { status, message } = await editUser(formData);
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
      signOut();
      router.push("/");
      router.refresh();
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
          Change {session.data?.user.name}'s details
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
          type="password"
          name="new=password"
          id="new-password"
          placeholder="new password"
          className="w-full h-10 pl-5 rounded-md mb-10 border border-black"
          autoComplete="off"
          value={newpassword}
          onChange={(e) => setNewPasssword(e.target.value)}
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
            handleEdit();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
