import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../hooks/useForm";

const Register = () => {
  const navigate = useNavigate();

  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          password2: confirmPassword,
        },
      );

      console.log("Register API:", response.data);

      navigate("/login");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FFFDF8] px-6 py-8">
      <div className="mx-auto flex max-w-2xl flex-col justify-center">

        <div className="mb-5 text-center">
          <div className="text-4xl">✨</div>

          <h1 className="mt-2 text-3xl font-black text-[#344E41]">
            Create Your Account
          </h1>
        </div>

        <form
          autoComplete="off"
          onSubmit={handleRegister}
          className="rounded-[32px] bg-white p-7 shadow-md"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="text-sm font-bold text-[#344E41]">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                autoComplete="off"
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#344E41]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                autoComplete="off"
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#344E41]">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                autoComplete="off"
                onChange={handleChange}
                placeholder="Create a password"
                className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-[#344E41]">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                autoComplete="off"
                onChange={handleChange}
                placeholder="Confirm your password"
                className="mt-2 w-full rounded-2xl border border-[#DDE5DD] bg-[#F8FAF6] px-4 py-3 text-sm outline-none transition focus:border-[#588157]"
              />
            </div>

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
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="mt-5 text-center text-sm text-[#78847C]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#588157] hover:text-[#344E41]"
            >
              Login
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

export default Register;