import axios from "axios";

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // Or specify your allowed origin
    "Access-Control-Allow-Headers": "Content-Type, Accept, Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "CORS preflight",
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, role, skills, goal } = body;

    const HF_TOKEN = process.env.HF_TOKEN;
    const MODEL = process.env.MODEL;
    const HF_URL = process.env.HF_URL;

    const prompt = `Write a confident elevator pitch for someone named ${name}, a ${role}, with experience in ${skills}, and whose goal is ${goal}. The pitch must be no longer than 180 characters, including spaces and punctuation.`;

    const response = await axios.post(
      HF_URL,
      {
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: false,
        parameters: {
          max_new_tokens: 180,
          return_full_text: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message =
      response.data?.choices?.[0]?.message?.content || "No response";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message }),
    };
  } catch (err) {
    console.error("Error Netlify: ", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Something went wrong." }),
    };
  }
};
