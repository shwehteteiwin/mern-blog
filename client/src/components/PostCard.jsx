import { Link } from "react-router-dom";

const PostCard = ({
  post,
  author,
  showActions = false,
  onDelete,
}) => {
  return (
    <div
      className={`group overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        showActions ? "" : "hover:-translate-y-2 hover:shadow-xl"
      }`}
    >
      <Link to={`/posts/${post._id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-[#F1F4EF]">
          <span className="absolute left-5 top-5 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#344E41]">
            {post.category}
          </span>

          <img
            src={`http://localhost:5000/uploads/${post.thumbnail}`}
            alt={post.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h2 className="line-clamp-2 text-xl font-black text-[#344E41]">
            {post.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-[#78847C]">
            {post.description}
          </p>

          {author && (
            <div className="mt-5">
              <span className="text-xs font-semibold text-[#6B776F]">
                By {author}
              </span>
            </div>
          )}
        </div>
      </Link>

      {showActions && (
        <div className="flex items-center gap-2 px-5 pb-5">
          <Link
            to={`/posts/${post._id}/edit`}
            className="rounded-full bg-[#344E41] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#588157]"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(post._id)}
            className="rounded-full bg-[#FFE8ED] px-4 py-2 text-xs font-bold text-[#C23B5D] transition hover:bg-[#FFD5DF]"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;