import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import UserComponent from "./UserComponent";
export default async function UserImage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-row gap-5 justify-center text-center">
      {!session?.user ? (
        <ButtonComponent />
      ) : (
        <UserComponent session={session} />
      )}
    </div>
  );
}
