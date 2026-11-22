import { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
const categories = [
  { name: "All Stories", bg: "bg-[#FFF0B8]" },
  { name: "Agriculture", bg: "bg-[#DDF4D2]" },
  { name: "Business", bg: "bg-[#D8EEFF]" },
  { name: "Education", bg: "bg-[#E7D9FF]" },
  { name: "Entertainment", bg: "bg-[#FFE1E8]" },
  { name: "Art", bg: "bg-[#FFDCC8]" },
  { name: "Investment", bg: "bg-[#FFF0B8]" },
  { name: "Uncategorized", bg: "bg-[#E8EDE8]" },
  { name: "Weather", bg: "bg-[#D8EEFF]" },
];

const Home = () => {
  const user = useAuthStore((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");

        console.log("Posts API:", response.data);

        setPosts(response.data);

        const authorData = {};

        for (const post of response.data) {
          try {
            const authorResponse = await api.get(`/users/${post.creator}`);

            authorData[post.creator] = authorResponse.data.name;
          } catch (err) {
            console.error("Author error:", err);
          }
        }

        setAuthors(authorData);
      } catch (err) {
        console.error(err);
        setError("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const filteredPosts =
    selectedCategory === "All Stories"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);
  return (
    <div className="min-h-screen overflow-hidden bg-[#FFFDF8] text-[#26332B]">
      {/* Hero */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-[#E5F5FF] via-[#FFF1F8] to-[#FFF4C7]">
        <div className="absolute -left-20 top-20 h-48 w-48 rounded-full bg-[#C8E6FF] opacity-60 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#FFD4E5] opacity-60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-[#243B2D] md:text-6xl">
              Where every story
              <span className="block text-[#D94F8A]">
                becomes an adventure.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#53645A]">
              Discover lovely stories, meet creative authors, and find a little
              inspiration for your next adventure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#344E41] px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#2F3E46]">
                Explore Stories →
              </button>

              <button className="rounded-full border-2 border-[#344E41]/15 bg-white px-7 py-3.5 font-bold text-[#344E41] transition hover:-translate-y-1 hover:border-[#A3B18A]">
                Start Writing ✨
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-[#FFD9E8] opacity-70 blur-2xl" />

            <div className="relative w-full max-w-lg">
              <div className="absolute right-8 top-4 text-4xl">⭐</div>
              <div className="absolute left-6 top-16 text-3xl">✨</div>
              <div className="absolute right-16 bottom-12 text-3xl">☁️</div>

              <div className="relative mx-auto mt-12 h-52 w-80 rotate-[-4deg] rounded-[35px] bg-gradient-to-br from-[#4E6E58] to-[#344E41] shadow-2xl">
                <div className="absolute inset-4 rounded-[25px] border border-white/20" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-6xl">🌙</div>
                  <p className="mt-2 text-sm font-bold text-white">
                    Once Upon a Story
                  </p>
                </div>
              </div>

              <div className="absolute left-20 top-0 flex h-32 w-32 items-center justify-center rounded-full bg-[#FFD0B5] text-7xl shadow-lg">
                👧🏻
              </div>

              <div className="absolute right-16 top-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#FFD9A8] text-6xl shadow-lg">
                🐻
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Stories */}
      <section className="bg-[#FFF0F7] px-6 py-14">
        <div className="mx-auto w-[80%] max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div
              onClick={() => setSelectedCategory(categories.name)}
              className={`... cursor-pointer`}
            >
              {/* <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#D94F8A]">
              Discover
            </p> */}

              <h2 className="text-3xl font-black text-[#344E41]">
                Explore by Category
              </h2>
            </div>
          </div>

          <div className="overflow-visible">
            <div className="flex gap-4 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`${category.bg} group min-w-[150px] shrink-0 rounded-[28px] px-4 py-2 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <p className="font-bold text-[#344E41]">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8 flex items-end justify-between">
            <div>
              {/* <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#D94F8A]">
                Fresh from the community
              </p> */}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/posts/${post._id}`}
                  className="block"
                >
                  <article className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative flex h-56 items-center justify-center">
                      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#344E41]">
                        {post.category}
                      </div>

                      <img
                        src={`http://localhost:5000/uploads/${post.thumbnail}`}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-black text-[#344E41]">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-sm text-[#78847C]">
                        {post.description}
                      </p>

                      <div className="mt-5">
                        <span className="text-xs font-semibold text-[#6B776F]">
                          By {authors[post.creator]}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] bg-white px-6 py-14 text-center shadow-sm">
              <div className="text-6xl">📖</div>

              <h3 className="mt-5 text-2xl font-black text-[#344E41]">
                No stories here yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78847C]">
                There aren't any stories in this category yet. Maybe your story
                could be the first one! ✨
              </p>
            </div>
          )}

          <button className="mt-6 w-full rounded-full border border-[#D8B8C7] bg-white px-5 py-3 text-sm font-bold text-[#344E41] sm:hidden">
            View all stories →
          </button>
        </div>
      </section>

      {/* Find Your Story */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#DDF2FF] via-[#E9F7E0] to-[#FFF0C7]">
          <div className="grid items-center gap-8 px-8 py-10 md:grid-cols-2 md:px-12">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#588157]">
                Have a story of your own?
              </p>

              <h2 className="text-3xl font-black leading-tight text-[#344E41] md:text-4xl">
                Turn your ideas into stories
                <span className="block text-[#D94F8A]">
                  and share them with a community.
                </span>
              </h2>

              {/* <p className="mt-4 max-w-md text-[#53645A]">
                Choose a category and discover stories that match your mood.
              </p> */}

              <div className="mt-6 flex flex-wrap gap-2">
                {/* {["Adventure", "Fantasy", "Friendship", "Mystery"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#344E41] shadow-sm transition hover:-translate-y-1"
                    >
                      {tag}
                    </button>
                  )
                )} */}
                <Link
                  to={user ? "/create-post" : "/login"}
                  className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-bold text-[#344E41] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  Start Writing your story
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/70 shadow-inner">
                <div className="text-center">
                  <div className="text-8xl">📚</div>
                  <p className="mt-3 font-bold text-[#344E41]">
                    Pick a story ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Writing CTA */}
      {/* <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#344E41] px-8 py-14 text-center text-white shadow-xl">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 text-5xl">✍️✨</div>

            <h2 className="text-3xl font-black md:text-4xl">
              Have a story of your own?
            </h2>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#DCE8DF]">
              Turn your ideas into stories and share them with a community of
              curious readers and creative writers.
            </p>

            <button className="mt-7 rounded-full bg-white px-7 py-3.5 font-bold text-[#344E41] transition hover:-translate-y-1 hover:shadow-lg">
              Start Writing ✨
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
