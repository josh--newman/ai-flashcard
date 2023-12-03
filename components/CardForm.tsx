import styles from "./CardForm.module.css";
import { useState, FormEvent, useRef } from "react";

const CardForm = () => {
  const [sentence, setSentence] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { front: sentence, back, targetWord };
      await fetch("/api/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setSentence("");
      setTargetWord("");
      setBack("");
      formRef.current?.reset();
    } catch (e) {
      console.error(e);
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
    <form ref={formRef} className={styles.formContainer} onSubmit={onSubmit}>
      <label htmlFor="sentence">Sentence</label>
      <textarea
        rows={5}
        onChange={(e) => setSentence(e.target.value)}
        name="sentence"
        id="sentence"
      />

      <label htmlFor="targetWord">Target word</label>
      <input
        type="text"
        onChange={(e) => setTargetWord(e.target.value)}
        name="targetWord"
        id="targetWord"
      />

      <label htmlFor="back">Back</label>
      <textarea
        rows={5}
        onChange={(e) => setBack(e.target.value)}
        name="back"
        id="back"
        value={back}
      />

      <button disabled={!sentence || !targetWord || !back} type="submit">
        Submit
      </button>
      <button
        disabled={!sentence || !targetWord || loading}
        onClick={generateBack}
      >
        {loading ? "Generating..." : "AI ✨"}
      </button>
    </form>
  );
};

export default CardForm;
