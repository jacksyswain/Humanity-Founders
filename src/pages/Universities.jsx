import { useState } from "react";
import { useUser } from "../context/UserContext";
import { universities } from "../data/universities";
import UniversityCard from "../components/UniversityCard";
import UnlockModal from "../components/UnlockModal";
import { useNavigate } from "react-router-dom";

export default function Universities() {
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();

  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const isLocked = profile.lockedUniversities.length > 0;
  const lockedUniversity = profile.lockedUniversities[0];

  const lockUniversity = uni => {
    const confirmed = window.confirm(
      "Locking a university will make your strategy application-specific."
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
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">University Shortlist</h1>
        <p className="text-gray-500">
          Choose carefully — locking sets your application strategy
        </p>
      </div>

      {/* LOCKED BANNER */}
      {isLocked && (
        <div className="border border-green-600 bg-green-50 rounded p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-green-700">
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
  );
}

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
