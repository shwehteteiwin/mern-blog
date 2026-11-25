import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useResource from "../hooks/useResource";
import api from "../lib/api";
import PostCard from "../components/PostCard";

const AuthorPosts = () => {
  const { id } = useParams();

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useResource(`/posts/users/${id}`);

  const {
    data: author,
    loading: authorLoading,
    error: authorError,
  } = useResource(`/users/${id}`);

  const [currentPosts, setCurrentPosts] = useState(null);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/posts/${postId}`);

      setCurrentPosts((currentPosts) =>
        (currentPosts || posts).filter((post) => post._id !== postId),
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete story. Please try again.",
      );
    }
  };

  const displayPosts = currentPosts ?? posts ?? [];

  const loading = postsLoading || authorLoading;
  const error = postsError || authorError;

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

          <p className="mt-2 text-[#78847C]">Failed to load author posts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto min-h-screen w-[80%] bg-[#FFFDF8] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mt-1 text-3xl font-black text-[#344E41]">
            {author?.name}'s Stories
          </h1>
        </div>

        {displayPosts.length === 0 ? (
          <div className="rounded-4xl bg-white px-6 py-14 text-center shadow-sm">
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
            {displayPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                showActions={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPosts;
