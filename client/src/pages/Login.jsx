import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import useForm from "../hooks/useForm";
const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    formData,
    handleChange,
  } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
      );

      console.log("Login API:", response.data);

      const { token, id, name } = response.data;

      login(
        {
          id,
          name,
        },
        token,
      );

      navigate("/");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)] items-center justify-center bg-[#FFFDF8] px-6">
      <div className="w-full max-w-md">
        <div className="mb-5 text-center">
          <div className="text-4xl">📖</div>

          <h1 className="mt-2 text-3xl font-black text-[#344E41]">
            Welcome Back!
          </h1>

          <p className="mt-1 text-sm text-[#78847C]">
            Come back and discover more stories.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="rounded-4xl bg-white p-7 shadow-md"
        >
          <div>
            <label className="text-sm font-bold text-[#344E41]">
              Email
            </label>

            <input
              type="email"
              name="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-bold text-[#344E41]">
              Password
            </label>

            <input
              type="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
            />
          </div>

          {error && (
            <p className="mt-4 rounded-2xl bg-[#FFE8ED] px-4 py-3 text-sm font-semibold text-[#C23B5D]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#344E41] py-3 font-bold text-white transition hover:bg-[#588157] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-[#78847C]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#588157] hover:text-[#344E41]"
            >
              Register
            </Link>
          </p>
        </form>

        <Link
          to="/"
          className="mt-4 block text-center text-sm font-semibold text-[#588157] hover:text-[#344E41]"
        >
          ← Back to Stories
        </Link>
      </div>
    </div>
  );
};

export default Login;