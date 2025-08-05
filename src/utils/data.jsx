import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchLocally = ({ name, role, skills, goal, isDone, setIsDone }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_TOKEN = import.meta.env.VITE_API_TOKEN;

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          messages: [
            {
              role: "user",
              content: `Create a 1-sentence elevator pitch for someone named ${name}, a ${role}, who is skilled in ${skills}, and wants to ${goal}`,
            },
          ],
          model: "mistralai/mistral-7b-instruct",
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setData(
        response.data.choices[0]?.message?.content || "No pitch generated."
      );
    } catch (err) {
      console.log(err);
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
export default useFetchLocally;
