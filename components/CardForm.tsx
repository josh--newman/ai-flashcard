import { useState, FC, FormEvent } from "react";

interface Props {
  onDone: () => void;
}

const CardForm: FC<Props> = ({ onDone }) => {
  const [sentence, setSentence] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { front: sentence, back };
      await fetch("/api/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    } finally {
      onDone();
    }
  };

  const generateBack = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { sentence, targetWord };
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const backText = data.choices[0].message.content;
      setBack(backText);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="sentence">Sentence</label>
      <br />
      <textarea
        onChange={(e) => setSentence(e.target.value)}
        name="sentence"
        id="sentence"
      />
      <br />
      <label htmlFor="targetWord">Target word</label>
      <br />
      <textarea
        onChange={(e) => setTargetWord(e.target.value)}
        name="targetWord"
        id="targetWord"
      />
      <br />
      <label htmlFor="back">Back</label>
      <br />
      <textarea
        onChange={(e) => setBack(e.target.value)}
        name="back"
        id="back"
        value={back}
      />
      <br />
      <button disabled={!sentence || !targetWord || !back} type="submit">
        Submit
      </button>
      <button
        disabled={!sentence || !targetWord || loading}
        onClick={generateBack}
      >
        {loading ? "🔄" : "AI ✨"}
      </button>
    </form>
  );
};

export default CardForm;
