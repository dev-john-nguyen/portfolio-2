import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Sidebar } from './components/Sidebar';
import AuthProvider from "./context/auth/AuthProvider";
import PostsProvider from "./context/posts/PostsProvider";
import { Admin } from "./screens/Admin";
import { Blog } from "./screens/Blog";
import { Contact } from "./screens/Contact";
import { Portfolio } from "./screens/Portfolio";
import { Post } from "./screens/Post";

import './styles/App.css'

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <AuthProvider>
        <PostsProvider>
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/post/:id" element={<Post />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<Portfolio />} />
            </Routes>
            <Footer />
          </div>
        </PostsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
