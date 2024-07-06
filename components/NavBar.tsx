import UserImage from "./UserImage";
import Header from "./Header";

export default function NavBar() {
  return (
    <div className="w-full h-[11vh] bg-main-bg flex flex-row justify-between pt-5 px-10 font-sans border-b-2 border-black">
      <Header></Header>
      <UserImage></UserImage>
    </div>
  );
}
