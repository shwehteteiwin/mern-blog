import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";

const AuthorPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const [postsResponse, userResponse] = await Promise.all([
          api.get(`/posts/users/${id}`),
          api.get(`/users/${id}`),
        ]);

        console.log("Author Posts API:", postsResponse.data);

        setPosts(postsResponse.data);
        setAuthor(userResponse.data.name);
      } catch (err) {
        console.error(err);
        setError("Failed to load author posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [id]);
  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/posts/${postId}`);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId),
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete story. Please try again.",
      );
    }
  };
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8] px-6 text-center">
        <div>
          <div className="text-6xl">📖</div>
          <h2 className="mt-4 text-2xl font-black text-[#344E41]">
            Something went wrong
          </h2>
          <p className="mt-2 text-[#78847C]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[80%] m-auto bg-[#FFFDF8] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          {/* <p className="text-sm font-bold text-[#D94F8A]">
            Author Posts
          </p> */}

          <h1 className="mt-1 text-3xl font-black text-[#344E41]">
            {author}'s Stories
          </h1>

          {/* <p className="mt-2 text-sm text-[#78847C]">
            Stories written by this author.
          </p> */}
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[32px] bg-white px-6 py-14 text-center shadow-sm">
            <div className="text-6xl">📖</div>

            <h2 className="mt-5 text-2xl font-black text-[#344E41]">
              No stories yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78847C]">
              This author hasn't shared any stories yet.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-full bg-[#344E41] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#588157]"
            >
              ← Back to Stories
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Link to={`/posts/${post._id}`}>
                  <div className="h-52 overflow-hidden bg-[#F1F4EF]">
                    <img
                      src={`http://localhost:5000/uploads/${post.thumbnail}`}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#FFE1E8] px-3 py-1 text-xs font-bold text-[#344E41]">
                      {post.category}
                    </span>

                    <h2 className="mt-3 line-clamp-2 text-xl font-black leading-tight text-[#344E41]">
                      {post.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#78847C]">
                      {post.description}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2 px-5 pb-5">
  <Link
    to={`/posts/${post._id}/edit`}
    className="rounded-full bg-[#344E41] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#588157]"
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(post._id)}
    className="rounded-full bg-[#FFE8ED] px-4 py-2 text-xs font-bold text-[#C23B5D] transition hover:bg-[#FFD5DF]"
  >
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPosts;
