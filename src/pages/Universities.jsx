import { useState } from "react";
import { useUser } from "../context/UserContext";
import { universities } from "../data/universities";
import UniversityCard from "../components/UniversityCard";
import UnlockModal from "../components/UnlockModal";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Universities() {
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();

  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const isLocked = profile.lockedUniversities.length > 0;
  const lockedUniversity = profile.lockedUniversities[0];

  const lockUniversity = uni => {
    const confirmed = window.confirm(
      "Locking a university will make your strategy application-specific. You can unlock later if needed."
    );
    if (!confirmed) return;

    setProfile(p => ({
      ...p,
      lockedUniversities: [uni.name],
      stage: "Preparing Applications",
    }));

    navigate("/dashboard");
  };

  const unlockUniversity = () => {
    setProfile(p => ({
      ...p,
      lockedUniversities: [],
      stage: "Discovering Universities",
    }));
    setShowUnlockModal(false);
  };

  return (
    <Layout title="University Shortlist">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* INTRO */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-700 text-lg">
            Universities are grouped by <strong>ambition</strong> and{" "}
            <strong>acceptance probability</strong>. Locking a university
            personalizes your entire application strategy.
          </p>
        </div>

        {/* LOCKED BANNER */}
        {isLocked && (
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-500 rounded-2xl p-5 shadow-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-700">
                Locked University
              </p>
              <p className="text-lg font-semibold text-emerald-900">
                {lockedUniversity}
              </p>
            </div>

            <button
              onClick={() => setShowUnlockModal(true)}
              className="text-sm font-medium text-red-600 underline hover:text-red-700"
            >
              Unlock
            </button>
          </div>
        )}

        {/* DREAM */}
        <Section
          title="Dream Universities"
          subtitle="Highly ambitious options with intense competition"
          accent="indigo"
        >
          {universities.dream.map(uni => (
            <UniversityCard
              key={uni.id}
              uni={uni}
              locked={isLocked}
              onLock={() => lockUniversity(uni)}
            />
          ))}
        </Section>

        {/* TARGET */}
        <Section
          title="Target Universities"
          subtitle="Balanced choices with realistic acceptance chances"
          accent="amber"
        >
          {universities.target.map(uni => (
            <UniversityCard
              key={uni.id}
              uni={uni}
              locked={isLocked}
              onLock={() => lockUniversity(uni)}
            />
          ))}
        </Section>

        {/* SAFE */}
        <Section
          title="Safe Universities"
          subtitle="High acceptance probability and lower risk"
          accent="emerald"
        >
          {universities.safe.map(uni => (
            <UniversityCard
              key={uni.id}
              uni={uni}
              locked={isLocked}
              onLock={() => lockUniversity(uni)}
            />
          ))}
        </Section>

        {/* UNLOCK MODAL */}
        {showUnlockModal && (
          <UnlockModal
            onCancel={() => setShowUnlockModal(false)}
            onConfirm={unlockUniversity}
          />
        )}
      </div>
    </Layout>
  );
}

/* ------------------ SECTION ------------------ */

function Section({ title, subtitle, accent, children }) {
  const accentMap = {
    indigo: "text-indigo-600",
    amber: "text-amber-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className={`text-2xl font-bold ${accentMap[accent]}`}>
          {title}
        </h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
