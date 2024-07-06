import BlogExcerpt from "./BlogExcerpt";
import MainBlog from "./MainBlog";

export default function PopularBlogs() {
  return (
    <div className="z-10 w-[60rem] h-[30rem] absolute top-32 left-72 flex flex-row gap-32 font-sans">
      <MainBlog></MainBlog>
      <div className="relative top-10">
        <h1 className="mb-7 text-center text-4xl font-semibold">
          Latest Blogs
        </h1>
        <BlogExcerpt></BlogExcerpt>
        <BlogExcerpt></BlogExcerpt>
      </div>
    </div>
  );
}
