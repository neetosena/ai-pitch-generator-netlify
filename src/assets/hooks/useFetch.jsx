import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = ({ name, role, skills, goal, isDone, setIsDone }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const FUNCTION_URL =
    "https://ai-pitch-elevator.netlify.app/.netlify/functions/generatePitch";

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        FUNCTION_URL,
        {
          name,
          role,
          skills,
          goal,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setData(response?.data?.message || "No pitch generated.");
    } catch (err) {
      console.log(err);
      console.error("Fetch error:", err.response?.data || err.message);
      setData("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDone(false);
    }
  };

  useEffect(() => {
    if (name && role && skills && goal && isDone) {
      fetchData();
    }
  }, [isDone]);

  return { isLoading, data };
};
export default useFetch;
