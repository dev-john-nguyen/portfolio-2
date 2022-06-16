import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "../../context/auth/AuthContext";

const Admin = () => {
    const { isAuth } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="create-post" element={<ProtectedRoute isAuth={isAuth}><CreatePost /></ProtectedRoute>} />
            <Route path="edit-post/:id" element={<ProtectedRoute isAuth={isAuth}><CreatePost /></ProtectedRoute>} />
            <Route path="/" element={<Login />} />
        </Routes>
    )
}

export default Admin