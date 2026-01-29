import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        {/* HERO CARD */}
        <div className="bg-white border rounded-2xl shadow-sm px-10 py-16">
          {/* PRODUCT BADGE */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border bg-gray-50 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            StudyAbroad AI
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Plan your study-abroad journey with a guided{" "}
            <span className="text-gray-900">AI counsellor</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Personalized guidance, intelligent university shortlisting,
            and step-by-step application readiness — all in one place.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/auth")}
              className="bg-black text-white px-10 py-4 rounded-xl text-lg hover:opacity-90 transition"
            >
              Get Started
            </button>
          </div>

          {/* TRUST LINE */}
          <p className="mt-8 text-sm text-gray-500">
            Free to start • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
