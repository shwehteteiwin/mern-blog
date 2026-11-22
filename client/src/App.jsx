import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from "./pages/CreatePost";
import AuthorPosts from './pages/AuthorPosts'
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";  
          import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/author-posts/:id" element={<AuthorPosts />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/edit" element={<EditProfile />} />
        </Routes>
      </main>
    </>
  )
}

export default App