import { FC } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ isAuth: boolean, children: any }> = ({ isAuth, children }) => {
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;