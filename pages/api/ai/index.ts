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
          'You are a Japanese to English translator and grammar teacher. The user will give you a sentence in Japanese and a target word or phrase from the sentence. Your job is to give a rough translation of the target word, a translation of the sentence and explain the target word as it applies to the sentence. Make the explanation simple and short. Do not use romaji under any circumstances.\n\nThe user will provide the sentence and target word in the following format:\n"""\nSentence\nTarget word\n"""\n\nYour response should look like the following:\n"""\n<target word> (furigana reading) - <translation>\n\n<full sentence translation>\n"""',
      },
      {
        role: "user",
        content: "子こどもたちが税務署の仕事しごとをやってみた\n税務署",
      },
      {
        role: "assistant",
        content:
          '税務署 (ぜいむしょ) - "tax office"\n\n"The children tried doing the work of the tax office."',
      },
      {
        role: "user",
        content:
          "横田めぐみさんが北朝鮮に拉致されてから46年が過ぎた\n拉致されて",
      },
      {
        role: "assistant",
        content:
          '"拉致されて" (らちされて) - passive form of "拉致する" (らちする) - "to abduct" or "to kidnap"\n\n"It has been 46 years since Megumi Yokota was abducted to North Korea."',
      },
      {
        role: "user",
        content:
          "ドラマが面白かったので、最終話まで一気に観てしまった\n一気に観てしまった",
      },
      {
        role: "assistant",
        content:
          '"一気に観てしまった" (いっきにみてしまった) - "ended up watching all at once"\n\n"Because the drama was interesting, I ended up watching it all the way to the final episode in one go."',
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
