import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { profile } = useUser();
  const location = useLocation();

  // Future-proof: profile might load async later
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your profile…</p>
      </div>
    );
  }

  // Onboarding gate
  if (!profile.onboardingComplete) {
    return (
      <Navigate
        to="/onboarding"
        replace
        state={{
          from: location.pathname,
          reason: "complete_onboarding",
        }}
      />
    );
  }

  return children;
}
