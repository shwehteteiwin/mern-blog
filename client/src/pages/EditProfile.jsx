import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import useForm from "../hooks/useForm";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const {
    formData: values,
    setFormData,
    handleChange,
  } = useForm({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);

        setProfile(response.data);

        setFormData((current) => ({
          ...current,
          name: response.data.name,
          email: response.data.email,
        }));
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, setFormData]);
  // Change avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");
    setSuccess("");

    try {
      setAvatarLoading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await api.post("/users/change-avatar", formData);

      setProfile((currentProfile) => ({
        ...currentProfile,
        avatar: response.data.avatar,
      }));

      setSuccess("Profile picture updated.");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Failed to change profile picture.",
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const response = await api.patch("/users/edit-user", {
        name: values.name,
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        newConfirmPassword: values.newConfirmPassword,
      });

      setProfile((currentProfile) => ({
        ...currentProfile,
        name: response.data.name,
        email: response.data.email,
      }));

      setFormData((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
        newConfirmPassword: "",
      }));

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FFFDF8] px-4 py-8">
      <div className="mx-auto max-w-md">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-5 shadow-sm"
        >
          {/* Avatar */}
          <div className="text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#A3B18A]">
                {profile?.avatar ? (
                  <img
                    src={`http://localhost:5000/uploads/${profile.avatar}`}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>

              <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-[#D94F8A] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
                {avatarLoading ? "..." : "Change"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <h1 className="mt-4 text-xl font-black text-[#344E41]">
              Edit Profile
            </h1>

            <p className="mt-1 text-xs text-[#78847C]">
              Update your account information.
            </p>
          </div>

          {/* Account Information */}
          <div className="mt-5">
            {/* Name + Email */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-[#344E41]">Name</label>

                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#344E41]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4 border-t border-[#E8EDE8] pt-3">
              <p className="text-xs font-black text-[#344E41]">
                Change Password
              </p>

              <div className="mt-2">
                {/* Current Password */}
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current password"
                  value={values.currentPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
                />

                {/* New + Confirm */}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    value={values.newPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
                  />

                  <input
                    type="password"
                    name="newConfirmPassword"
                    placeholder="Confirm new password"
                    value={values.newConfirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <p className="mt-3 rounded-xl bg-[#FFE8ED] px-3 py-2 text-xs font-semibold text-[#C23B5D]">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-3 rounded-xl bg-[#EAF4EA] px-3 py-2 text-xs font-semibold text-[#588157]">
              {success}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/profile/${id}`)}
              className="w-1/3 rounded-full border border-[#DDE5DD] py-2.5 text-xs font-bold text-[#53645A] transition hover:bg-[#F1F4EF]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-2/3 rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
