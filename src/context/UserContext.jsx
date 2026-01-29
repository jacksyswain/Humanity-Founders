import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const DEFAULT_PROFILE = {
  onboardingComplete: false,
  education: "",
  degree: "",
  graduationYear: "",
  targetDegree: "",
  field: "",
  countries: "",
  budget: "",
  exams: "",
  sop: "",
  stage: "Building Profile",
  lockedUniversities: [],
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // ---- PERSIST TO LOCALSTORAGE ----
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
