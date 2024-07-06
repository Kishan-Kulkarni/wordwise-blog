import Blog from "./Blog";

export default function AllBlogs() {
  return (
    <div className="ml-12 font-sans">
      <p className="text-xl font-bold ">All Blogs</p>
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
  );
}
