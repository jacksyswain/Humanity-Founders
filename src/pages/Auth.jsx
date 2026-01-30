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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* AUTH CARD */}
        <div className="bg-white border rounded-2xl shadow-sm p-8 space-y-6">
          {/* BRAND */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">
              StudyAbroad AI
            </p>
            <h1 className="text-2xl font-bold">
              Sign in to continue
            </h1>
            <p className="text-gray-600 mt-1">
              Get personalized guidance for your study-abroad journey
            </p>
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="text-sm font-medium mb-1 block">
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
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black ${
                error ? "border-red-500" : ""
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
            className="w-full bg-black text-white py-3 rounded-xl text-lg hover:opacity-90 transition"
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
            className="w-full border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <span className="text-lg">G</span>
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-500">
            This is a mock authentication flow for demonstration purposes
          </p>
        </div>

        {/* LEGAL / TRUST */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
