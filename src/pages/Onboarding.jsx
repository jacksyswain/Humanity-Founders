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
    <Layout title="Onboarding">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* INTRO CARD */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2 className="text-2xl font-bold">
            Tell us about yourself
          </h2>
          <p className="text-gray-600 mt-2">
            This information helps the AI counsellor personalize your guidance.
          </p>

          <div className="mt-4">
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <SectionTitle title="Academic Background" />

              <Input
                label="Current Education"
                placeholder="Bachelor's / Master's"
                value={form.education}
                onChange={v => setForm({ ...form, education: v })}
              />

              <Input
                label="Degree / Major"
                placeholder="Computer Science, Mechanical, etc."
                value={form.degree}
                onChange={v => setForm({ ...form, degree: v })}
              />

              <Input
                label="Graduation Year"
                placeholder="2024"
                value={form.graduationYear}
                onChange={v =>
                  setForm({ ...form, graduationYear: v })
                }
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <SectionTitle title="Study Goals" />

              <Input
                label="Target Degree"
                placeholder="MS / MBA / PhD"
                value={form.targetDegree}
                onChange={v =>
                  setForm({ ...form, targetDegree: v })
                }
              />

              <Input
                label="Field of Study"
                placeholder="Computer Science, Business, etc."
                value={form.field}
                onChange={v => setForm({ ...form, field: v })}
              />

              <Input
                label="Preferred Countries"
                placeholder="USA, Canada, Germany"
                value={form.countries}
                onChange={v =>
                  setForm({ ...form, countries: v })
                }
              />

              <Input
                label="Annual Budget"
                placeholder="₹20L / $30,000"
                value={form.budget}
                onChange={v => setForm({ ...form, budget: v })}
              />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <SectionTitle title="Readiness & Exams" />

              <Input
                label="Exams Status"
                placeholder="IELTS / GRE / Not Started"
                value={form.exams}
                onChange={v => setForm({ ...form, exams: v })}
              />

              <div>
                <label className="text-sm font-medium mb-1 block">
                  SOP Status
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
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
              </div>
            </>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-between items-center">
          {step > 1 && (
            <button
              onClick={back}
              className="px-5 py-2 border rounded-lg"
            >
              Back
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={next}
              className="ml-auto bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              className="ml-auto bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
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

function Input({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <h3 className="text-lg font-semibold border-b pb-2 mb-4">
      {title}
    </h3>
  );
}
