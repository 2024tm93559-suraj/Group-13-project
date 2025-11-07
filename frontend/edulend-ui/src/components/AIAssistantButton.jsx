import React, { useState } from "react";
import { toast } from "react-toastify";

const AIAssistantButton = ({ name, setDescription }) => {
  const [loading, setLoading] = useState(false);

  const handleAISuggestion = async () => {
    if (!name) {
      toast.warn("Please enter equipment name first!");
      return;
    }

    setLoading(true);

    // ✅ Simulated AI Response (frontend-only)
    setTimeout(() => {
      const suggestions = {
        "Drill Machine":
          "A portable power tool used for drilling holes. Requires regular lubrication and bit inspection.",
        Projector:
          "Device used for visual presentations. Clean lens weekly and check cooling fan every month.",
        Microscope:
          "Used for magnifying small objects. Keep lenses dust-free and store in a dry cabinet.",
      };

      const response =
        suggestions[name] ||
        `The ${name} is a useful equipment. Ensure proper maintenance and regular inspection for safety and performance.`;

      setDescription(response);
      toast.success("AI suggestion added!");
      setLoading(false);
    }, 1500);
  };

  return (
    <button
      className="btn btn-secondary mt-2"
      onClick={handleAISuggestion}
      disabled={loading}
    >
      {loading ? "AI Thinking..." : "AI Suggest Details"}
    </button>
  );
};

export default AIAssistantButton;
