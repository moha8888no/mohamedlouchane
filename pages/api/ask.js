export default async function handler(req, res) {
  const { question, subject } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `أنت مساعد لتلاميذ شهادة التعليم المتوسط في الجزائر. اشرح بأسلوب مبسط، وركز على مادة ${subject}.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
