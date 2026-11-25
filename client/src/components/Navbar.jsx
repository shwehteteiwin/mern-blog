import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8EDE8] bg-[#FFFDF8]/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-black text-[#344E41]"
        >
          Story<span className="text-[#D94F8A]">Blog</span>
        </Link>

        <div className="flex items-center gap-2">

          <Link
            to="/"
            className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#53645A] transition hover:bg-[#F1F4EF] sm:block"
          >
            Stories
          </Link>

          {user ? (
            <>
              <Link
                to={`/author-posts/${user.id}`}
                className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#53645A] transition hover:bg-[#F1F4EF] md:block"
              >
                My Posts
              </Link>

             <Link
  to={`/profile/${user.id}`}
  className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#53645A] transition hover:bg-[#F1F4EF] md:block"
>
  Profile
</Link>

              {/* <span className="hidden text-sm font-bold text-[#344E41] md:block">
                {user.name} 
              </span> */}

              <button
                onClick={logout}
                className="rounded-full bg-[#344E41] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#588157]"
              >
                Logout
              </button>
               <Link
                to="/create-post"
                className="rounded-full bg-[#D94F8A] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#C23B75]"
              >
                + Create Story
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-bold text-[#53645A] transition hover:bg-[#F1F4EF]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#344E41] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#588157]"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;