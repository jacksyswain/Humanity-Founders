import { useUser } from "../context/UserContext";

export default function Universities() {
  const { setProfile } = useUser();

  const lockUni = () => {
    setProfile(p => ({ ...p, lockedUniversities: ["Sample University"], stage: "Preparing Applications" }));
    alert("University Locked!");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Universities</h2>
      <button onClick={lockUni} className="bg-black text-white px-4 py-2 rounded">
        Lock Sample University
      </button>
    </div>
  );
}