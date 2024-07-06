import { Session } from "next-auth";
import Image from "next/image";
import UserButton from "./UserButton";
export default function UserComponent({ session }: { session: Session }) {
  return (
    <>
      <div className="w-10 h-10 relative">
        <Image
          src={session?.user.image as string}
          alt="user-image"
          fill
          priority
          className="rounded-full border border-black"
        />
      </div>
      <p className="font-sans text-xl font-bold ">{session?.user.name}</p>
      <UserButton />
    </>
  );
}
