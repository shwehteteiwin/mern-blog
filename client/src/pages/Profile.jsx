
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import useAuthStore from "../stores/authStore";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const authUser = useAuthStore((state) => state.user);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
useEffect(() => {
  if (!authUser) {
    navigate("/login");
  }
}, [authUser, navigate]);
useEffect(() => {
  if (!authUser) return;

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [id, authUser]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
        <p className="font-bold text-[#344E41]">Loading profile...</p>
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


// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../lib/api";
// import useAuthStore from "../stores/authStore";

// const Profile = () => {
//   const { id } = useParams();
//   const userFromStore = useAuthStore((state) => state.user);

//   const [user, setUser] = useState(null);

//   const [isEditing, setIsEditing] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newConfirmPassword, setNewConfirmPassword] = useState("");

//   const [avatar, setAvatar] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [avatarLoading, setAvatarLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await api.get(`/users/${id}`);

//         setUser(response.data);
//         setName(response.data.name);
//         setEmail(response.data.email);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleSaveProfile = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     try {
//       setSaving(true);

//       const response = await api.patch("/users/edit-user", {
//         name,
//         email,
//         currentPassword,
//         newPassword,
//         newConfirmPassword,
//       });

//       setUser((currentUser) => ({
//         ...currentUser,
//         ...response.data,
//       }));

//       setCurrentPassword("");
//       setNewPassword("");
//       setNewConfirmPassword("");

//       setIsEditing(false);
//       setSuccess("Profile updated successfully.");
//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.message ||
//           "Failed to update profile."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleAvatarChange = async (e) => {
//     const selectedFile = e.target.files[0];

//     if (!selectedFile) return;

//     setAvatar(selectedFile);
//     setError("");
//     setSuccess("");

//     try {
//       setAvatarLoading(true);

//       const formData = new FormData();
//       formData.append("avatar", selectedFile);

//       const response = await api.post(
//         "/users/change-avatar",
//         formData
//       );

//       setUser((currentUser) => ({
//         ...currentUser,
//         avatar: response.data.avatar,
//       }));

//       setSuccess("Profile picture updated.");
//     } catch (err) {
//       console.error(err);

//       setError(
//         err.response?.data?.message ||
//           "Failed to change profile picture."
//       );
//     } finally {
//       setAvatarLoading(false);
//       setAvatar(null);
//     }
//   };

//   const handleCancel = () => {
//     setName(user.name);
//     setEmail(user.email);

//     setCurrentPassword("");
//     setNewPassword("");
//     setNewConfirmPassword("");

//     setError("");
//     setSuccess("");
//     setIsEditing(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
//         <p className="font-bold text-[#344E41]">
//           Loading profile...
//         </p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8] px-6 text-center">
//         <div>
//           <div className="text-6xl">👤</div>

//           <h2 className="mt-4 text-2xl font-black text-[#344E41]">
//             Profile not found
//           </h2>

//           <Link
//             to="/"
//             className="mt-6 inline-block rounded-full bg-[#344E41] px-6 py-3 text-sm font-bold text-white"
//           >
//             ← Back to Stories
//           </Link>
//         </div>
//       </div>
//     );
//   }

//  return (
//   <div className="min-h-[calc(100vh-72px)] bg-[#FFFDF8] px-4 py-8">
//     <div className="mx-auto max-w-xl">

//       {/* Profile Header */}
//       <div className="text-center">

//         <div className="relative mx-auto h-24 w-24">
//           <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#A3B18A] shadow-sm">
//             {user.avatar ? (
//               <img
//                 src={`http://localhost:5000/uploads/${user.avatar}`}
//                 alt={user.name}
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <span className="text-3xl">👤</span>
//             )}
//           </div>

//           {isEditing && (
//             <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-[#D94F8A] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
//               {avatarLoading ? "..." : "Change"}

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//                 className="hidden"
//               />
//             </label>
//           )}
//         </div>

//         {!isEditing ? (
//           <>
//             <h1 className="mt-4 text-2xl font-black text-[#344E41]">
//               {user.name}
//             </h1>

//             <p className="mt-1 text-sm text-[#78847C]">
//               {user.email}
//             </p>

//             {/* Stats */}
//             <div className="mx-auto mt-5 flex max-w-xs justify-center gap-3">
//               <div className="min-w-28 rounded-2xl bg-[#F1F4EF] px-5 py-3">
//                 <p className="text-xl font-black text-[#344E41]">
//                   {user.posts}
//                 </p>

//                 <p className="mt-0.5 text-[11px] font-bold text-[#78847C]">
//                   Stories
//                 </p>
//               </div>

//               <div className="min-w-28 rounded-2xl bg-[#FFF0F4] px-5 py-3">
//                 <p className="text-xl font-black text-[#D94F8A]">
//                   Author
//                 </p>

//                 <p className="mt-0.5 text-[11px] font-bold text-[#78847C]">
//                   StoryNest
//                 </p>
//               </div>
//             </div>

//             {success && (
//               <p className="mx-auto mt-4 max-w-sm rounded-xl bg-[#EAF4EA] px-4 py-2 text-xs font-semibold text-[#588157]">
//                 {success}
//               </p>
//             )}

//             {/* Actions */}
//             <div className="mx-auto mt-5 flex max-w-sm gap-2">
//               <button
//                 onClick={() => {
//                   setError("");
//                   setSuccess("");
//                   setIsEditing(true);
//                 }}
//                 className="flex-1 rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157]"
//               >
//                 Edit Profile
//               </button>

//               <Link
//                 to={`/author-posts/${user._id}`}
//                 className="flex-1 rounded-full border border-[#DDE5DD] py-2.5 text-center text-xs font-bold text-[#344E41] transition hover:bg-[#F1F4EF]"
//               >
//                 My Stories
//               </Link>
//             </div>
//           </>
//         ) : (
//           /* Edit Mode */
//           <form
//             onSubmit={handleSaveProfile}
//             className="mx-auto mt-5 max-w-md rounded-[24px] bg-white p-5 text-left shadow-sm"
//           >
//             <div className="text-center">
//               <h1 className="text-xl font-black text-[#344E41]">
//                 Edit Profile
//               </h1>

//               <p className="mt-1 text-xs text-[#78847C]">
//                 Update your account information.
//               </p>
//             </div>

//             <div className="mt-5 space-y-3">

//               <div>
//                 <label className="text-xs font-bold text-[#344E41]">
//                   Name
//                 </label>

//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-[#344E41]">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-1.5 w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
//                 />
//               </div>

//               <div className="border-t border-[#E8EDE8] pt-3">
//                 <p className="text-xs font-black text-[#344E41]">
//                   Change Password
//                 </p>

//                 <div className="mt-2 space-y-2">

//                   <input
//                     type="password"
//                     placeholder="Current password"
//                     value={currentPassword}
//                     onChange={(e) =>
//                       setCurrentPassword(e.target.value)
//                     }
//                     className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
//                   />

//                   <input
//                     type="password"
//                     placeholder="New password"
//                     value={newPassword}
//                     onChange={(e) =>
//                       setNewPassword(e.target.value)
//                     }
//                     className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
//                   />

//                   <input
//                     type="password"
//                     placeholder="Confirm new password"
//                     value={newConfirmPassword}
//                     onChange={(e) =>
//                       setNewConfirmPassword(e.target.value)
//                     }
//                     className="w-full rounded-xl border border-[#DDE5DD] bg-[#F8FAF6] px-3 py-2.5 text-xs outline-none focus:border-[#588157]"
//                   />

//                 </div>
//               </div>
//             </div>

//             {error && (
//               <p className="mt-3 rounded-xl bg-[#FFE8ED] px-3 py-2 text-xs font-semibold text-[#C23B5D]">
//                 {error}
//               </p>
//             )}

//             <div className="mt-4 flex gap-2">

//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="w-1/3 rounded-full border border-[#DDE5DD] py-2.5 text-xs font-bold text-[#53645A] transition hover:bg-[#F1F4EF]"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="w-2/3 rounded-full bg-[#344E41] py-2.5 text-xs font-bold text-white transition hover:bg-[#588157] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {saving ? "Saving..." : "Save Changes"}
//               </button>

//             </div>
//           </form>
//         )}
//       </div>

//     </div>
//   </div>
// );
// };

// export default Profile;
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../lib/api";

// const Profile = () => {
//   const { id } = useParams();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await api.get(`/users/${id}`);

//         console.log("Profile API:", response.data);

//         setUser(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8]">
//         <p className="font-bold text-[#344E41]">
//           Loading profile...
//         </p>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#FFFDF8] px-6 text-center">
//         <div>
//           <div className="text-6xl">👤</div>

//           <h2 className="mt-4 text-2xl font-black text-[#344E41]">
//             Profile not found
//           </h2>

//           <p className="mt-2 text-[#78847C]">
//             {error}
//           </p>

//           <Link
//             to="/"
//             className="mt-6 inline-block rounded-full bg-[#344E41] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#588157]"
//           >
//             ← Back to Stories
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FFFDF8] px-6 py-12">
//       <div className="mx-auto max-w-3xl">

//         <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">

//           <div className="h-32 bg-[#344E41]" />

//           <div className="px-6 pb-8 sm:px-10">

//             <div className="-mt-14 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">

//               <div className="flex flex-col items-center sm:items-start">
//                 <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#A3B18A] shadow-md">
//                   {user.avatar ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${user.avatar}`}
//                       alt={user.name}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-4xl">👤</span>
//                   )}
//                 </div>

//                 <h1 className="mt-4 text-3xl font-black text-[#344E41]">
//                   {user.name}
//                 </h1>

//                 <p className="mt-1 text-sm text-[#78847C]">
//                   {user.email}
//                 </p>
//               </div>

//               <Link
//                 to="/edit-profile"
//                 className="mt-5 rounded-full bg-[#344E41] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#588157] sm:mt-0"
//               >
//                 Edit Profile
//               </Link>

//             </div>

//             <div className="mt-8 grid grid-cols-2 gap-3">

//               <div className="rounded-2xl bg-[#F1F4EF] p-5 text-center">
//                 <p className="text-2xl font-black text-[#344E41]">
//                   {user.posts}
//                 </p>

//                 <p className="mt-1 text-xs font-bold text-[#78847C]">
//                   Stories
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-[#FFF0F4] p-5 text-center">
//                 <p className="text-2xl font-black text-[#D94F8A]">
//                   Author
//                 </p>

//                 <p className="mt-1 text-xs font-bold text-[#78847C]">
//                   StoryNest
//                 </p>
//               </div>

//             </div>

//             <Link
//               to={`/author-posts/${user._id}`}
//               className="mt-5 block rounded-full border border-[#DDE5DD] py-3 text-center text-sm font-bold text-[#344E41] transition hover:bg-[#F1F4EF]"
//             >
//               View My Stories →
//             </Link>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;