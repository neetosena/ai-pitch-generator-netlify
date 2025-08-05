import axios from "axios";

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: "CORS preflight",
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { name, role, skills, goal } = body;

    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
    const MODEL = process.env.HF_MODEL;
    const HF_URL = process.env.HF_URL;

    const prompt = `Write a short max-length 180, confident elevator pitch for someone named ${name}, a ${role}, who has experience in ${skills}, and whose goal is to ${goal}.`;

    const response = await axios.post(
      HF_URL,
      {
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        steam: false,
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

    console.log("Deploying Netlify Function 🚀");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message }),
    };
  } catch (err) {
    console.error("Error Netlify: ", err.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Something went wrong." }),
    };
  }
};
