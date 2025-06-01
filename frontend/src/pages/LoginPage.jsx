import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (teamName.trim()) {
      localStorage.setItem("teamName", teamName.trim().toLowerCase());
      navigate("/my-team");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Fantasy Wrestling League</h1>
      <input
        type="text"
        placeholder="Enter your team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="p-2 border rounded w-64 mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Log In
      </button>
    </div>
  );
}
