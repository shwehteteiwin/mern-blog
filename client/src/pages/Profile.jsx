import { Link, useParams } from "react-router-dom";
import useResource from "../hooks/useResource";

const Profile = () => {
  const { id } = useParams();
  // const navigate = useNavigate();


  const {
    data: user,
    loading,
    error,
  } = useResource(`/users/${id}`);



  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF8] px-6 text-center">
        <div className="text-5xl">👤</div>

        <h2 className="mt-4 text-xl font-black text-[#344E41]">
          Profile not found
        </h2>

        <Link
          to="/"
          className="mt-5 rounded-full bg-[#344E41] px-6 py-2.5 text-xs font-bold text-white"
        >
          ← Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FFFDF8] px-4 py-10">
      <div className="mx-auto max-w-md text-center">

        {/* Avatar */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#A3B18A]">
          {user.avatar ? (
            <img
              src={`http://localhost:5000/uploads/${user.avatar}`}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl">👤</span>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-black text-[#344E41]">
          {user.name}
        </h1>

        <p className="mt-1 text-sm text-[#78847C]">
          {user.email}
        </p>

        {/* Stats */}
        <div className="mx-auto mt-6 flex max-w-xs justify-center gap-3">
          <div className="min-w-28 rounded-2xl bg-[#F1F4EF] px-5 py-3">
            <p className="text-xl font-black text-[#344E41]">
              {user.posts}
            </p>

            <p className="mt-0.5 text-[11px] font-bold text-[#78847C]">
              Stories
            </p>
          </div>

          <div className="min-w-28 rounded-2xl bg-[#FFF0F4] px-5 py-3">
            <p className="text-lg font-black text-[#D94F8A]">
              Author
            </p>

            <p className="mt-0.5 text-[11px] font-bold text-[#78847C]">
              StoryNest
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mx-auto mt-6 flex max-w-sm gap-2">
          <Link
            to={`/profile/${user._id}/edit`}
            className="flex-1 rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157]"
          >
            Edit Profile
          </Link>

          <Link
            to={`/author-posts/${user._id}`}
            className="flex-1 rounded-full border border-[#DDE5DD] py-2.5 text-xs font-bold text-[#344E41] transition hover:bg-[#F1F4EF]"
          >
            My Stories
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Profile;
