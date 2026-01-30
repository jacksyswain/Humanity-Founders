import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProgressBar from "../components/ProgressBar";
import Layout from "../components/Layout";

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

  const [errors, setErrors] = useState({});

  /* ------------------ VALIDATION ------------------ */

  const validateStep = currentStep => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!form.education) newErrors.education = "Required";
      if (!form.degree) newErrors.degree = "Required";
      if (!form.graduationYear) newErrors.graduationYear = "Required";
    }

    if (currentStep === 2) {
      if (!form.targetDegree) newErrors.targetDegree = "Required";
      if (!form.field) newErrors.field = "Required";
      if (!form.countries) newErrors.countries = "Required";
      if (!form.budget) newErrors.budget = "Required";
    }

    if (currentStep === 3) {
      if (!form.exams) newErrors.exams = "Required";
      if (!form.sop) newErrors.sop = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------ NAVIGATION ------------------ */

  const next = () => {
    if (!validateStep(step)) return;
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setErrors({});
    setStep(s => Math.max(s - 1, 1));
  };

  const completeOnboarding = () => {
    if (!validateStep(step)) return;

    setProfile(p => ({
      ...p,
      onboardingComplete: true,
      stage: "Discovering Universities",
      ...form,
    }));

    navigate("/dashboard");
  };

  return (
    <Layout title="Onboarding">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* INTRO CARD */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-indigo-600 mb-1">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Tell us about yourself
          </h2>
          <p className="text-gray-600 mt-2">
            This helps the AI counsellor personalize your guidance.
          </p>

          <div className="mt-4">
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow-sm space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <SectionTitle title="Academic Background" />

              <Input
                label="Current Education"
                value={form.education}
                onChange={v => setForm({ ...form, education: v })}
                error={errors.education}
              />

              <Input
                label="Degree / Major"
                value={form.degree}
                onChange={v => setForm({ ...form, degree: v })}
                error={errors.degree}
              />

              <Input
                label="Graduation Year"
                value={form.graduationYear}
                onChange={v =>
                  setForm({ ...form, graduationYear: v })
                }
                error={errors.graduationYear}
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <SectionTitle title="Study Goals" />

              <Input
                label="Target Degree"
                value={form.targetDegree}
                onChange={v =>
                  setForm({ ...form, targetDegree: v })
                }
                error={errors.targetDegree}
              />

              <Input
                label="Field of Study"
                value={form.field}
                onChange={v => setForm({ ...form, field: v })}
                error={errors.field}
              />

              <Input
                label="Preferred Countries"
                value={form.countries}
                onChange={v =>
                  setForm({ ...form, countries: v })
                }
                error={errors.countries}
              />

              <Input
                label="Annual Budget"
                value={form.budget}
                onChange={v => setForm({ ...form, budget: v })}
                error={errors.budget}
              />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <SectionTitle title="Readiness & Exams" />

              <Input
                label="Exams Status"
                value={form.exams}
                onChange={v => setForm({ ...form, exams: v })}
                error={errors.exams}
              />

              <div>
                <label className="text-sm font-medium mb-1 block">
                  SOP Status
                </label>
                <select
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.sop
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={form.sop}
                  onChange={e =>
                    setForm({ ...form, sop: e.target.value })
                  }
                >
                  <option value="">Select status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="Draft">Draft</option>
                  <option value="Ready">Ready</option>
                </select>
                {errors.sop && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.sop}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-between items-center">
          {step > 1 && (
            <button
              onClick={back}
              className="px-5 py-2 border rounded-xl hover:bg-gray-50 transition"
            >
              Back
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={next}
              className="ml-auto bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition shadow"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              className="ml-auto bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition shadow"
            >
              Complete Onboarding
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

/* ------------------ HELPERS ------------------ */

function Input({ label, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block text-gray-700">
        {label}
      </label>
      <input
        className={`w-full rounded-lg px-3 py-2 border focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-900">
      {title}
    </h3>
  );
}
