import { OpenAI } from "openai";

// POST /api/ai
// Required fields in body: sentence, targetWord
export default async function handle(req, res) {
  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(configuration);

  const { sentence, targetWord } = req.body;

  if (!sentence || !targetWord) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (sentence.length > 256) {
    return res.status(400).json({ error: "Sentence too long" });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          'You are a Japanese to English translator and grammar teacher. The user will give you a sentence in Japanese and a target word or phrase from the sentence. Your job is to give a rough translation of the sentence and explain the target word as it applies to the sentence. Make the explanation simple and short.\n\nThe user will provide the sentence and target word in the following format:\n"""\nSentence\nTarget word\n"""',
      },
      {
        role: "user",
        content: "子こどもたちが税務署の仕事しごとをやってみた\n税務署",
      },
      {
        role: "assistant",
        content:
          '"The children tried doing the work of the tax office."\n\n"税務署" (ぜいむしょ) means "tax office". In this sentence, it is used to specify the type of work the children tried to do. It\'s a place where tax-related matters are handled.',
      },
      {
        role: "user",
        content:
          "横田めぐみさんが北朝鮮に拉致されてから46年が過ぎた\n拉致されて",
      },
      {
        role: "assistant",
        content:
          '"It has been 46 years since Megumi Yokota was abducted to North Korea."\n\n"拉致されて" (らちされて) is the passive form of the verb "拉致する" (らちする), which means "to abduct" or "to kidnap". In this sentence, it is used to describe the action that happened to Megumi Yokota. The passive form is used when the subject of the sentence is the one being affected by the action.',
      },
      {
        role: "user",
        content: `${sentence}\n${targetWord}`,
      },
    ],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return res.json(response);
}
