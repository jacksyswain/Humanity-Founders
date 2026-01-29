import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        onClick={() => navigate("/onboarding")}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Mock Login → Onboarding
      </button>
    </div>
  );
}