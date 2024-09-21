import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function GET(req) {
  // WARNING: Do not expose your keys
  // WARNING: If you host publicly your project, add an authentication layer to limit the consumption of ChatGPT resources

  const speech = req.nextUrl.searchParams.get("speech") || "formal";

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${
          req.nextUrl.searchParams.get("question") ||
          "What is the most impact region by fload in nyc?"
        }in ${speech} speech?`,
      },
      {
        role: "system",
        content: `You always respond with a JSON object with the following format: 
        {
          "response": "",
        }`,
      },
      {
        role: "user",
        content: `${
          req.nextUrl.searchParams.get("question") ||
          "Have you ever been to Japan?"
        } in ${speech} speech?`,
      },
    ],
    // model: "gpt-4-turbo-preview", // https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
    model: "gpt-3.5-turbo", // https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4
    response_format: {
      type: "json_object",
    },
  });
  console.log(chatCompletion.choices[0].message.content);
  return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
}
