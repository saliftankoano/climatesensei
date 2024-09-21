// app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json(); // Get the request body

  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use your OpenAI API key
    },
    body: JSON.stringify({
      model: 'gpt-4', // OpenAI model
      messages: messages.map((msg) => ({ role: msg.role, content: msg.content })),
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  const message = data.choices[0].message.content.trim();

  return NextResponse.json({ message }); // Respond with the message
}
