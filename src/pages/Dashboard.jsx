import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import Layout from "../components/Layout";

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
    <Layout title="Dashboard">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* STAGE CARD */}
        <div className="bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-indigo-600 mb-1">Current Stage</p>
          <p className="text-xl font-semibold text-gray-900">
            {profile.stage}
          </p>
        </div>

        {/* PROFILE SUMMARY + STRENGTH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Profile Summary">
            <InfoRow label="Education" value={profile.education} />
            <InfoRow label="Target Degree" value={profile.targetDegree} />
            <InfoRow label="Countries" value={profile.countries} />
            <InfoRow label="Budget" value={profile.budget} />
          </Card>

          <Card title="Profile Strength (AI)">
            <StrengthRow label="Academics" value={profileStrength.academics} />
            <StrengthRow label="Exams" value={profileStrength.exams} />
            <StrengthRow label="SOP" value={profileStrength.sop} />
          </Card>
        </div>

        {/* AI TODO LIST */}
        <Card title="AI To-Do List">
          {tasks.length === 0 ? (
            <p className="text-emerald-600 font-medium">
              You are all caught up 🎉
            </p>
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
        </Card>

        {/* PRIMARY ACTION */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/counsellor")}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Talk to AI Counsellor →
          </button>
        </div>
      </div>
    </Layout>
  );
}

/* ------------------ HELPERS ------------------ */

function StrengthRow({ label, value }) {
  const color =
    value === "Strong"
      ? "text-emerald-600"
      : value === "Average" || value === "In Progress"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-700">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">
        {value || "—"}
      </span>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 shadow-sm space-y-3">
      {title && (
        <h3 className="font-semibold text-lg text-gray-900">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
