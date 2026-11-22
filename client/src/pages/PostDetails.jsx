import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";
const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)

        console.log("Post Detail API:", response.data);

        setPost(response.data);

        const authorResponse = await api.get(`/users/${response.data.creator}`)

        setAuthor(authorResponse.data.name);
      } catch (err) {
        console.error(err);
        setError("Failed to load this story.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">Loading story...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
     <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#FFFDF8] px-6">

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
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center font-bold text-[#588157] transition hover:text-[#344E41]"
        >
          ← Back to Stories
        </Link>

        <article className="mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-md md:flex">
          {/* Image */}
          <div className="flex w-full items-center justify-center bg-[#F1F4EF] md:w-1/2">
            <img
              src={`http://localhost:5000/uploads/${post.thumbnail}`}
              alt={post.title}
              className="max-h-[500px] w-full object-contain"
            />
          </div>

          {/* Story Info */}
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Category
              </p>

              <span className="mt-2 inline-block rounded-full bg-[#FFE1E8] px-4 py-2 text-sm font-bold text-[#344E41]">
                {post.category}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Title
              </p>

              <h1 className="mt-2 text-3xl font-black leading-tight text-[#344E41]">
                {post.title}
              </h1>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A958E]">
                Author
              </p>

              <p className="mt-2 font-semibold text-[#53645A]">{author}</p>
            </div>

            <div className="my-6 h-px bg-[#E8EDE8]" />

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
