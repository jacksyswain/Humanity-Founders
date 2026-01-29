import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ title, children }) {
  const { profile } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="font-bold text-lg cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            StudyAbroad AI
          </h1>

          {profile.onboardingComplete && (
            <span className="text-sm text-gray-600">
              Stage: <strong>{profile.stage}</strong>
            </span>
          )}
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {title && (
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
        )}
        {children}
      </main>
    </div>
  );
}
