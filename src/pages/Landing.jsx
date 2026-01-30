import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        {/* HERO CARD */}
        <div className="bg-white/80 backdrop-blur border rounded-3xl shadow-xl px-10 py-16">
          {/* PRODUCT BADGE */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            StudyAbroad AI
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
            Plan your study-abroad journey with a guided{" "}
            <span className="text-indigo-600">AI counsellor</span>
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
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl text-lg hover:bg-indigo-700 transition shadow-lg"
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
