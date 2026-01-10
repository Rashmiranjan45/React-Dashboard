import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/storage";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
