import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* PRODUCT NAME */}
        <p className="text-sm font-medium text-gray-500 mb-3">
          StudyAbroad AI
        </p>

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Plan your study-abroad journey with a guided{" "}
          <span className="text-gray-900">AI counsellor</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Personalized guidance, intelligent university shortlisting,
          and step-by-step application readiness.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/auth")}
            className="bg-black text-white px-8 py-4 rounded-lg text-lg hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>

        {/* TRUST / SUBTEXT */}
        <p className="mt-6 text-sm text-gray-500">
          Free to start • No commitment
        </p>
      </div>
    </div>
  );
}
