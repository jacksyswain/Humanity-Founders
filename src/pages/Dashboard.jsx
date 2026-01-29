import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useUser();

  // ---- AI GENERATED PROFILE STRENGTH (Mock Logic) ----
  const profileStrength = {
    academics: profile.education ? "Strong" : "Average",
    exams: profile.exams ? "In Progress" : "Not Started",
    sop: profile.sop || "Not Started",
  };

  // ---- AI GENERATED TASKS ----
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const generatedTasks = [];

    if (!profile.exams) {
      generatedTasks.push({
        id: 1,
        title: "Start exam preparation",
        description: "Begin IELTS / GRE preparation",
        completed: false,
      });
    }

    if (profile.sop !== "Ready") {
      generatedTasks.push({
        id: 2,
        title: "Work on SOP",
        description: "Draft your Statement of Purpose",
        completed: false,
      });
    }

    if (profile.lockedUniversities.length === 0) {
      generatedTasks.push({
        id: 3,
        title: "Shortlist universities",
        description: "Use AI counsellor to find universities",
        completed: false,
      });
    }

    setTasks(generatedTasks);
  }, [profile]);

  const markComplete = id => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: true } : t)));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Current Stage: <strong>{profile.stage}</strong>
        </p>
      </div>

      {/* PROFILE SUMMARY */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Profile Summary</h3>
          <p>Education: {profile.education || "—"}</p>
          <p>Target Degree: {profile.targetDegree || "—"}</p>
          <p>Countries: {profile.countries || "—"}</p>
          <p>Budget: {profile.budget || "—"}</p>
        </div>

        {/* PROFILE STRENGTH */}
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Profile Strength (AI)</h3>

          <div className="space-y-2">
            <StrengthRow label="Academics" value={profileStrength.academics} />
            <StrengthRow label="Exams" value={profileStrength.exams} />
            <StrengthRow label="SOP" value={profileStrength.sop} />
          </div>
        </div>
      </div>

      {/* AI TODO LIST */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-4">AI To-Do List</h3>

        {tasks.length === 0 ? (
          <p className="text-gray-500">You are all caught up 🎉</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => markComplete(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRIMARY ACTION */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/counsellor")}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Talk to AI Counsellor →
        </button>
      </div>
    </div>
  );
}

// ---- SMALL HELPER COMPONENT ----
function StrengthRow({ label, value }) {
  const color =
    value === "Strong"
      ? "text-green-600"
      : value === "Average"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );
}
