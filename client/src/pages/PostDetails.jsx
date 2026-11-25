import { Link, useParams } from "react-router-dom";
import useResource from "../hooks/useResource";

const PostDetail = () => {
  const { id } = useParams();

  const {
    data: post,
    loading,
    error,
  } = useResource(`/posts/${id}`);

  const {
    data: author,
    loading: authorLoading,
  } = useResource(post ? `/users/${post.creator}` : null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">
          Loading story...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF8] px-6 text-center">
        <div className="text-6xl">📖</div>

        <h2 className="mt-5 text-2xl font-black text-[#344E41]">
          Story not found
        </h2>

        <p className="mt-2 text-[#78847C]">
          We couldn't find the story you're looking for.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-full bg-[#344E41] px-6 py-3 font-bold text-white"
        >
          ← Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="mb-6 inline-flex items-center font-bold text-[#588157] transition hover:text-[#344E41]"
        >
          ← Back to Stories
        </Link>

        <article className="mx-auto max-w-4xl overflow-hidden rounded-4xl bg-white shadow-md md:flex">

          {/* Image */}
          <div className="flex w-full items-center justify-center bg-[#F1F4EF] md:w-1/2">
            <img
              src={`http://localhost:5000/uploads/${post.thumbnail}`}
              alt={post.title}
              className="max-h-125 w-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">

            {/* Category */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Category
              </p>

              <span className="mt-2 inline-block rounded-full bg-[#FFE1E8] px-4 py-2 text-sm font-bold text-[#344E41]">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Title
              </p>

              <h1 className="mt-2 text-3xl font-black leading-tight text-[#344E41]">
                {post.title}
              </h1>
            </div>

            {/* Author */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Author
              </p>

              <p className="mt-2 font-semibold text-[#53645A]">
                {authorLoading ? "Loading..." : author?.name}
              </p>
            </div>

            <div className="my-6 h-px bg-[#E8EDE8]" />

            {/* Description */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Description
              </p>

              <p className="mt-2 text-base leading-7 text-[#53645A]">
                {post.description}
              </p>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;