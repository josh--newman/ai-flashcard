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
          'You are a Japanese to English translator and grammar teacher. The user will give you a sentence in Japanese and a target word or phrase from the sentence. Your job is to give a rough translation of the sentence and explain the target word as it applies to the sentence. Make the explanation simple and short. Reply in Markdown. Only provide one translation for the target word and make it the most relevant to the context of the sentence.\n\nThe user will provide the sentence and target word in the following format:\n"""\nSentence\nTarget word\n"""',
      },
      {
        role: "user",
        content: "子こどもたちが税務署の仕事しごとをやってみた\n税務署",
      },
      {
        role: "assistant",
        content:
          "「税務署」 ー **ぜいむしょ**  (tax office)\n\n_The children tried doing the work of the tax office._",
      },
      {
        role: "user",
        content:
          "横田めぐみさんが北朝鮮に拉致されてから46年が過ぎた\n拉致されて",
      },
      {
        role: "assistant",
        content:
          "「拉致されて」 ー **らちされて** (was abducted)\n\n_46 years have passed since Megumi Yokota was abducted to North Korea._",
      },
      {
        role: "user",
        content:
          "ドラマが面白かったので、最終話まで一気に観てしまった\n一気に観てしまった",
      },
      {
        role: "assistant",
        content:
          "「一気に観てしまった」 ー **いっきにみてしまった** (ended up watching all at once)\n\n_The drama was so interesting that I ended up watching it all the way to the final episode in one go._",
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
