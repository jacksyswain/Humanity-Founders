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
      <div className="max-w-6xl mx-auto space-y-12">
        {/* INTRO */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-lg">
            Universities are grouped by <strong>ambition</strong> and{" "}
            <strong>acceptance probability</strong>.  
            Locking a university will personalize your entire application
            strategy.
          </p>
        </div>

        {/* LOCKED BANNER */}
        {isLocked && (
          <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 border border-green-600 rounded-xl p-5 shadow-sm">
            <div>
              <p className="text-sm text-green-700 uppercase tracking-wide">
                Locked University
              </p>
              <p className="text-lg font-semibold text-green-800">
                {lockedUniversity}
              </p>
            </div>

            <button
              onClick={() => setShowUnlockModal(true)}
              className="text-sm text-red-600 font-medium underline hover:text-red-700"
            >
              Unlock
            </button>
          </div>
        )}

        {/* DREAM */}
        <Section
          title="Dream Universities"
          subtitle="Highly ambitious choices with strong competition"
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
          subtitle="Balanced options with realistic acceptance chances"
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

function Section({ title, subtitle, children }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
