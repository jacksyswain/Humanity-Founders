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
      <div className="max-w-6xl mx-auto space-y-10">
        {/* SUBTEXT */}
        <p className="text-gray-600">
          Universities are grouped by ambition and acceptance probability.
          Locking a university sets your application strategy.
        </p>

        {/* LOCKED BANNER */}
        {isLocked && (
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-green-700">
                Locked University
              </p>
              <p className="text-sm text-green-600">
                {lockedUniversity}
              </p>
            </div>

            <button
              onClick={() => setShowUnlockModal(true)}
              className="text-sm text-red-600 underline"
            >
              Unlock
            </button>
          </div>
        )}

        {/* DREAM */}
        <Section title="Dream Universities">
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
        <Section title="Target Universities">
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
        <Section title="Safe Universities">
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

/* ------------------ SECTION WRAPPER ------------------ */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
