import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { profile } = useUser();

  if (!profile.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
