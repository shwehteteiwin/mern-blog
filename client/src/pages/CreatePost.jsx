import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

const navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);

    const response = await api.post("/posts", formData);

    console.log("Create Post API:", response.data);

    navigate("/");
  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message ||
        "Failed to create story. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-[calc(100vh-72px)] overflow-y-auto bg-[#FFFDF8] px-4 py-5">
      <div className="mx-auto max-w-xl">

        {/* Heading */}
        <div className="mb-4 text-center">
          <div className="text-2xl">✍️</div>

          <h1 className="mt-1 text-xl font-black text-[#344E41]">
            Create a New Story
          </h1>

          <p className="mt-1 text-xs text-[#78847C]">
            Share something worth reading.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] bg-white p-5 shadow-sm"
        >
          {/* Title + Category */}
          <div className="grid gap-3 sm:grid-cols-2">

            <div>
              <label className="text-xs font-bold text-[#344E41]">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Story title"
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
                <option value="Agriculture">Agriculture</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Art">Art</option>
                <option value="Investment">Investment</option>
                <option value="Uncategorized">Uncategorized</option>
                <option value="Weather">Weather</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="mt-3">
            <label className="text-xs font-bold text-[#344E41]">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your story..."
              rows="3"
              className="mt-1.5 w-full resize-none rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none transition focus:border-[#588157]"
            />
          </div>

          {/* Thumbnail */}
          <div className="mt-3">
            <label className="text-xs font-bold text-[#344E41]">
              Thumbnail
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
          {/* Button */}
        <button
  type="submit"
  disabled={loading}
  className="mt-4 w-full rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157] disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Publishing..." : "Publish Story ✨"}
</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;