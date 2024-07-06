import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import ButtonComponent from "@/components/ButtonComponent";
import Image from "next/image";
import EditUserButton from "@/components/EditUserButton";
import Blog from "@/components/Blog";
import LogoutButton from "@/components/LogoutButton";

export default async function UserPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="w-full h-[89vh] gap-5 bg-main-bg flex flex-row justify-center items-center">
        <ButtonComponent />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full h-[78vh] flex flex-col justify-center items-center bg-main-bg mb-10">
        <div className="w-60 h-60 relative mb-5">
          <Image
            src={session.user.image as string}
            alt="/user-image"
            fill
            priority
            className="rounded-full border border-black"
          />
        </div>
        <h2 className="text-2xl font-sans text-centre mb-5">
          {session.user.name}
        </h2>
        <EditUserButton />
        <LogoutButton />
      </div>
      <div className="ml-12 font-sans">
        <p className="text-xl font-bold ">Blogs by {session.user.name}</p>
        <div className="w-full flex flex-row flex-wrap gap-7 mb-5">
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
          <Blog></Blog>
        </div>
      </div>
    </div>
  );
}
