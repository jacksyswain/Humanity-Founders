import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProgressBar from "../components/ProgressBar";

export default function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = useUser();

  const TOTAL_STEPS = 3;
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    education: "",
    degree: "",
    graduationYear: "",
    targetDegree: "",
    field: "",
    countries: "",
    budget: "",
    exams: "",
    sop: "",
  });

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const completeOnboarding = () => {
    setProfile(p => ({
      ...p,
      onboardingComplete: true,
      stage: "Discovering Universities",
      ...form,
    }));
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Tell us about yourself</h1>

      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            placeholder="Current Education"
            className="w-full border p-2 rounded"
            value={form.education}
            onChange={e => setForm({ ...form, education: e.target.value })}
          />

          <input
            placeholder="Degree / Major"
            className="w-full border p-2 rounded"
            value={form.degree}
            onChange={e => setForm({ ...form, degree: e.target.value })}
          />

          <input
            placeholder="Graduation Year"
            className="w-full border p-2 rounded"
            value={form.graduationYear}
            onChange={e =>
              setForm({ ...form, graduationYear: e.target.value })
            }
          />
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <input
            placeholder="Target Degree (MS / MBA / PhD)"
            className="w-full border p-2 rounded"
            value={form.targetDegree}
            onChange={e =>
              setForm({ ...form, targetDegree: e.target.value })
            }
          />

          <input
            placeholder="Field of Study"
            className="w-full border p-2 rounded"
            value={form.field}
            onChange={e => setForm({ ...form, field: e.target.value })}
          />

          <input
            placeholder="Preferred Countries"
            className="w-full border p-2 rounded"
            value={form.countries}
            onChange={e => setForm({ ...form, countries: e.target.value })}
          />

          <input
            placeholder="Annual Budget (₹ / $)"
            className="w-full border p-2 rounded"
            value={form.budget}
            onChange={e => setForm({ ...form, budget: e.target.value })}
          />
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <input
            placeholder="Exams Status (IELTS / GRE)"
            className="w-full border p-2 rounded"
            value={form.exams}
            onChange={e => setForm({ ...form, exams: e.target.value })}
          />

          <select
            className="w-full border p-2 rounded"
            value={form.sop}
            onChange={e => setForm({ ...form, sop: e.target.value })}
          >
            <option value="">SOP Status</option>
            <option value="Not Started">Not Started</option>
            <option value="Draft">Draft</option>
            <option value="Ready">Ready</option>
          </select>
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button onClick={back} className="px-4 py-2 border rounded">
            Back
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={next}
            className="ml-auto bg-black text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={completeOnboarding}
            className="ml-auto bg-black text-white px-4 py-2 rounded"
          >
            Complete Onboarding
          </button>
        )}
      </div>
    </div>
  );
}
