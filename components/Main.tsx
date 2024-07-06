import PopularBlogs from "./PopularBlogs";

export default function Main() {
  return (
    <div className="w-full h-[75vh] bg-main-bg mb-12 overflow-hidden">
      <div className="w-[42vw] h-80 bg-indigo-200 top-32 relative border-2 border-black rounded-full rotate-[22.5deg] -translate-x-48 z-0"></div>
      <div className="w-60 h-60 bg-indigo-200 -top-[19rem] left-[79rem] relative border-2 border-black rounded-full z-0 translate-x-36 "></div>

      <PopularBlogs></PopularBlogs>
    </div>
  );
}
