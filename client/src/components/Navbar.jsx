import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8EDE8] bg-[#FFFDF8]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-black text-[#344E41]"
        >
          Story<span className="text-[#D94F8A]">Nest</span>
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
// const Navbar = () => {
//   return (
//         <nav className="sticky top-0 z-50 border-b border-[#F0E7EA] bg-[#FFFDFB]/95 backdrop-blur-md">
//       <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-6 px-6">

//         {/* Logo */}
//         <a href="#" className="flex shrink-0 items-center gap-2.5">
//           <div className="flex h-11 w-11 rotate-[-4deg] items-center justify-center rounded-2xl bg-[#DDF2FF] text-2xl shadow-sm">
//             📖
//           </div>

//           <div className="leading-none">
//             <h1 className="text-[21px] font-black tracking-tight text-[#344E41]">
//               My<span className="text-[#D94F8A]">Blog</span>
//             </h1>

//             <p className="mt-1 text-[9px] font-semibold tracking-wide text-[#7C8A82]">
//               READ · IMAGINE · CREATE
//             </p>
//           </div>
//         </a>

//         {/* Main Navigation */}
//         <div className="ml-4 hidden items-center gap-7 lg:flex">
//           <a
//             href="#"
//             className="relative text-sm font-bold text-[#D94F8A]"
//           >
//             Home
//             <span className="absolute -bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-[#D94F8A]" />
//           </a>

//           <a
//             href="#"
//             className="text-sm font-semibold text-[#344E41] transition hover:text-[#D94F8A]"
//           >
//             Stories
//           </a>

//           <a
//             href="#"
//             className="text-sm font-semibold text-[#344E41] transition hover:text-[#D94F8A]"
//           >
//             Categories
//           </a>

//           <a
//             href="#"
//             className="text-sm font-semibold text-[#344E41] transition hover:text-[#D94F8A]"
//           >
//             Authors
//           </a>
//         </div>

//         {/* Right Side */}
//         <div className="ml-auto flex items-center gap-3">

//           {/* Search
//           <div className="hidden items-center gap-2 rounded-full border border-[#E8DDE2] bg-white px-4 py-2.5 transition focus-within:border-[#D94F8A] md:flex">
//             <span className="text-base">🔍</span>

//             <input
//               type="text"
//               placeholder="Search stories..."
//               className="w-36 bg-transparent text-xs font-medium text-[#344E41] outline-none placeholder:text-[#A6AFA9] lg:w-44"
//             />
//           </div> */}

//           {/* Favorite */}
//           <button
//             type="button"
//             className="hidden h-10 w-10 items-center justify-center rounded-full text-xl text-[#344E41] transition hover:bg-[#FFF0F7] hover:text-[#D94F8A] sm:flex"
//             aria-label="Favorites"
//           >
//             ♡
//           </button>

//           {/* Login */}
//           <a
//             href="#"
//             className="hidden rounded-full px-4 py-2.5 text-sm font-bold text-[#344E41] transition hover:bg-[#F2F5F0] sm:block"
//           >
//             Log in
//           </a>

//           {/* Start Writing */}
//           <a
//             href="#"
//             className="rounded-full bg-[#D94F8A] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#D94F8A]/20 transition hover:-translate-y-0.5 hover:bg-[#C83E79] hover:shadow-lg"
//           >
//             <span className="hidden sm:inline">✨ Start Writing</span>
//             <span className="sm:hidden">✍️</span>
//           </a>

//           {/* Mobile menu */}
//           <button
//             type="button"
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F5F0] text-xl text-[#344E41] lg:hidden"
//             aria-label="Open menu"
//           >
//             ☰
//           </button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar
