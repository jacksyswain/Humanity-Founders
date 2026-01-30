import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* AUTH CARD */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl shadow-xl p-8 space-y-6">
          {/* BRAND BADGE */}
          <div className="flex justify-center">
            <div className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              StudyAbroad AI
            </div>
          </div>

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign in to continue
            </h1>
            <p className="text-gray-600 mt-1">
              Your personalized study-abroad assistant
            </p>
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full rounded-xl px-4 py-3 bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">
                {error}
              </p>
            )}
          </div>

          {/* PRIMARY CTA */}
          <button
            onClick={handleContinue}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg hover:bg-indigo-700 transition shadow-md"
          >
            Continue
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
            className="w-full bg-white border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <span className="text-lg">G</span>
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-500">
            This is a mock authentication flow
          </p>
        </div>

        {/* LEGAL */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
