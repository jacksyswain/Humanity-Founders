import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* AUTH CARD */}
        <div className="bg-white border rounded-2xl shadow-sm p-8 space-y-6">
          {/* HEADER */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              StudyAbroad AI
            </p>
            <h1 className="text-2xl font-bold">
              Welcome back
            </h1>
            <p className="text-gray-600 mt-1">
              Sign in to continue your study-abroad journey
            </p>
          </div>

          {/* MOCK LOGIN ACTION */}
          <button
            onClick={() => navigate("/onboarding")}
            className="w-full bg-black text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
          >
            Continue with Email
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-200" />
            or
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE MOCK */}
          <button
            onClick={() => navigate("/onboarding")}
            className="w-full border py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500">
            This is a mock authentication flow
          </p>
        </div>
      </div>
    </div>
  );
}
