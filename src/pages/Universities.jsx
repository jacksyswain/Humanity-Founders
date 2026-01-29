import { useUser } from "../context/UserContext";
import { universities } from "../data/universities";
import UniversityCard from "../components/UniversityCard";
import { useNavigate } from "react-router-dom";

export default function Universities() {
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();

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

  const isLocked = profile.lockedUniversities.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold">University Shortlist</h1>
        <p className="text-gray-500">
          Categorized by ambition and acceptance probability
        </p>
      </div>

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
