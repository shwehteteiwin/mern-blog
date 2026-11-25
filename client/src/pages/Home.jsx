import { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import PostCard from "../components/PostCard";

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
        setLoading(true);
        setError("");

        const url =
          selectedCategory === "All Stories"
            ? "/posts"
            : `/posts/categories/${selectedCategory}`;

        const response = await api.get(url);

        console.log("Posts API:", response.data);

        setPosts(response.data);

        const authorData = {};

        for (const post of response.data) {
          try {
            const authorResponse = await api.get(
              `/users/${post.creator}`,
            );

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
  }, [selectedCategory]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#FFFDF8] text-[#26332B]">
      {/* Featured Stories */}
      <section className="bg-[#FFF0F7] px-6 py-14">
        <div className="mx-auto w-[80%] max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
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
                  className={`${category.bg} group min-w-37.5 shrink-0 rounded-[28px] px-4 py-2 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <p className="font-bold text-[#344E41]">
                    {category.name}
                  </p>
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

          {/* {loading ? (
            <div className="rounded-[32px] bg-white px-6 py-14 text-center shadow-sm">
              <div className="text-5xl">📚</div>

              <h3 className="mt-5 text-2xl font-black text-[#344E41]">
                Loading stories...
              </h3>
            </div>
          ) : error ? ( */}
          {loading ? (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="overflow-hidden rounded-[28px] bg-white shadow-sm"
      >
        <div className="h-56 animate-pulse bg-[#E8EDE8]" />

        <div className="p-5">
          <div className="h-5 w-3/4 animate-pulse rounded bg-[#E8EDE8]" />

          <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#F1F4EF]" />

          <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-[#F1F4EF]" />
        </div>
      </div>
    ))}
  </div>
) : error ? (
            <div className="rounded-4xl bg-white px-6 py-14 text-center shadow-sm">
              <div className="text-5xl">😕</div>

              <h3 className="mt-5 text-2xl font-black text-[#344E41]">
                Something went wrong
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78847C]">
                {error}
              </p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  author={authors[post.creator]}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-4xl bg-white px-6 py-14 text-center shadow-sm">
              <div className="text-6xl">📖</div>

              <h3 className="mt-5 text-2xl font-black text-[#344E41]">
                No stories here yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78847C]">
                There aren't any stories in this category yet. Maybe your
                story could be the first one! ✨
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
        <div className="overflow-hidden rounded-[36px] bg-linear-to-r from-[#DDF2FF] via-[#E9F7E0] to-[#FFF0C7]">
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

    </div>
  );
};

export default Home;