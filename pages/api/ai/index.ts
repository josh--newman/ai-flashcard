import { OpenAI } from "openai";

// POST /api/ai
export default async function handle(req, res) {
  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(configuration);
  const response = await openai.models.list();
  res.json(response);
}
