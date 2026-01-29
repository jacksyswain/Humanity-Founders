import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">
        Plan your study-abroad journey with a guided AI counsellor
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        Personalized guidance and university shortlisting.
      </p>
      <button
        onClick={() => navigate("/auth")}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Get Started
      </button>
    </div>
  );
}