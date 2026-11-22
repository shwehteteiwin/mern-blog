import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

const categories = [
  "Agriculture",
  "Business",
  "Education",
  "Entertainment",
  "Art",
  "Investment",
  "Uncategorized",
  "Weather",
];

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);

        const post = response.data;

        setTitle(post.title);
        setCategory(post.category);
        setDescription(post.description);
      } catch (err) {
        console.error(err);
        setError("Failed to load this story.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await api.patch(`/posts/${id}`, formData);

      console.log("Edit Post API:", response.data);

      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update story. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">
          Loading story...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] overflow-y-auto bg-[#FFFDF8] px-4 py-8">
      <div className="mx-auto max-w-xl">

        <div className="mb-5 text-center">
          <div className="text-2xl">✏️</div>

          <h1 className="mt-1 text-xl font-black text-[#344E41]">
            Edit Your Story
          </h1>

          <p className="mt-1 text-xs text-[#78847C]">
            Make your story even better.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] bg-white p-5 shadow-sm"
        >
          <div className="grid gap-3 sm:grid-cols-2">

            <div>
              <label className="text-xs font-bold text-[#344E41]">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none transition focus:border-[#588157]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#344E41]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none transition focus:border-[#588157]"
              >
                <option value="">Select category</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="mt-3">
            <label className="text-xs font-bold text-[#344E41]">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="mt-1.5 w-full resize-none rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none transition focus:border-[#588157]"
            />
          </div>

          <div className="mt-3">
            <label className="text-xs font-bold text-[#344E41]">
              New Thumbnail
              <span className="ml-1 font-normal text-[#78847C]">
                (optional)
              </span>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="mt-1.5 block w-full cursor-pointer rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2 text-xs text-[#53645A]"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-xl bg-[#FFE8ED] px-3 py-2 text-xs font-semibold text-[#C23B5D]">
              {error}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="w-1/3 rounded-full border border-[#DDE5DD] py-2.5 text-xs font-bold text-[#53645A] transition hover:bg-[#F1F4EF]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-2/3 rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes ✨"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditPost;