import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ title, children }) {
  const { profile } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* TOP BAR */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* BRAND */}
          <h1
            className="font-bold text-lg text-indigo-600 cursor-pointer hover:text-indigo-700 transition"
            onClick={() => navigate("/dashboard")}
          >
            StudyAbroad AI
          </h1>

          {/* STAGE INDICATOR */}
          {profile.onboardingComplete && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Stage</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                {profile.stage}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {title}
          </h2>
        )}

        {children}
      </main>
    </div>
  );
}
