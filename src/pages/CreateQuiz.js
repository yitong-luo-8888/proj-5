import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/newAuthContext";

/* ---------- helpers ---------- */
const emptyAnswer   = () => ({ text: "", correct: false });
const emptyQuestion = () => ({ points: 100, question: "", answers: Array(4).fill().map(emptyAnswer) });
const emptyCategory = () => ({ name: "", questions: Array(6).fill().map(emptyQuestion) });


const Page = styled.div` max-width:900px; margin:40px auto; color:#f5f5f5; `;

const Head = styled.h2` text-align:center; margin-bottom:24px; `;

const Error = styled.p` color:tomato; font-weight:bold; `;

const Input = styled.input`
  width:100%; padding:6px 10px; margin:4px 0 10px;
  background:#181a1f; border:1px solid #333; border-radius:4px; color:#eee;
`;

const Small = styled.input.attrs({ type:"number" })`
  width:90px; padding:6px 8px; background:#181a1f; border:1px solid #333;
  border-radius:4px; color:#eee; margin-right:8px;
`;

const CategoryBox = styled.div`
  border:1px solid #444; border-radius:6px; padding:16px; margin:20px 0;
  background:#101216;
`;

const QuestionBox = styled.div`
  padding:12px; margin:16px 0; border-radius:4px; background:#15171c;
`;

const AnswerGrid = styled.div`
  display:grid; grid-template-columns:1fr auto; gap:6px 12px; margin-top:6px;
`;

const RadioWrap = styled.label` display:flex; align-items:center; gap:4px; color:#bbb; `;

const Btn = styled.button.withConfig({
  shouldForwardProp: (prop) => !["inline", "secondary"].includes(prop)
})`
  display: block;
  margin: ${p => p.inline ? "0" : "30px auto 60px"};
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${p => p.secondary ? "#38bdf8" : "#006aff"};
  color: #fff;
  transition: transform .18s, background .18s;
  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: ${p => p.secondary ? "#60cfff" : "#2485ff"};
  }
  &:disabled {
    background: #444;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function CreateQuiz() {
  const { token } = useAuth();
  const nav = useNavigate();

  /* ---------- state ---------- */
  const [quiz, setQuiz] = useState({ title:"", categories:Array(6).fill().map(emptyCategory) });
  const [aiPrompt, setAiPrompt] = useState("");
  const [err, setErr] = useState("");
  const [sending, setSend] = useState(false);
  const [thinking, setThink] = useState(false);

  /* ---------- local update helper ---------- */
  const handle = (c,q,a,field,val) => {
    setQuiz(prev => {
      const copy = structuredClone(prev);
      if (a!==null)      copy.categories[c].questions[q].answers[a][field]=val;
      else if (q!==null) copy.categories[c].questions[q][field]=val;
      else if (c!==null) copy.categories[c][field]=val;
      else               copy[field]=val;
      return copy;
    });
  };

  const generateAI = async () => {
    if (!aiPrompt.trim()) return;
    setErr(""); setThink(true);
    try {
      const token = localStorage.getItem("jwt");

    const res = await fetch("http://localhost:3001/api/v1/gameRoutes/quizzes/gpt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: "6 category " + aiPrompt })
    });
      const data = await res.json();
      setThink(false);
      if (!res.ok) throw new Error(data.error || "AI error");
      setQuiz(data);                    
    } catch (e) { setErr(e.message); setThink(false); }
  };

  const publish = async () => {
    setErr("");
    if (!quiz.title.trim()) return setErr("Need a quiz title");
    if (quiz.categories.some(c => !c.name.trim())) return setErr("Every category needs a name");

    setSend(true);
    try {
        const res = await fetch("http://localhost:3001/api/v1/gameRoutes/quizzes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(quiz)
        });

        if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        nav("/login");
        return;
        }

        const data = await res.json();

        setSend(false);
        if (!res.ok) throw new Error(data.error || "Server error");

        nav(`/gamezone/${encodeURIComponent(data.title)}`);
    } catch (e) {
        setSend(false);
        setErr(e.message);
    }
    };

  return (
    <Page>
      <Head>Create a New Quiz</Head>
      {err && <Error>{err}</Error>}

      <Input
        placeholder="Ask AI (e.g. 'Create a Harry‑Potter Jeopardy quiz')"
        value={aiPrompt}
        onChange={e=>setAiPrompt(e.target.value)}
      />
      <Btn secondary inline disabled={thinking} onClick={generateAI}>
        {thinking ? "Thinking…" : "Generate with AI"}
      </Btn>

      <Input
        placeholder="Quiz title"
        value={quiz.title}
        onChange={e=>handle(null,null,null,"title",e.target.value)}
      />

      {quiz.categories.map((cat,cIdx)=>(
        <CategoryBox key={cIdx}>
          <h3>Category {cIdx+1}</h3>
          <Input
            placeholder="Category name"
            value={cat.name}
            onChange={e=>handle(cIdx,null,null,"name",e.target.value)}
          />
          {cat.questions.map((q,qIdx)=>(
            <QuestionBox key={qIdx}>
              <Small
                min="0"
                value={q.points}
                onChange={e=>handle(cIdx,qIdx,null,"points",+e.target.value)}
              />
              <Input
                placeholder="Question text"
                value={q.question}
                onChange={e=>handle(cIdx,qIdx,null,"question",e.target.value)}
              />
              {q.answers.map((a,aIdx)=>(
                <AnswerGrid key={aIdx}>
                  <Input
                    placeholder={`Answer ${aIdx+1}`}
                    value={a.text}
                    onChange={e=>handle(cIdx,qIdx,aIdx,"text",e.target.value)}
                  />
                  <RadioWrap>
                    <input
                      type="radio"
                      name={`correct-${cIdx}-${qIdx}`}
                      checked={a.correct}
                      onChange={()=>handle(cIdx,qIdx,null,"answers",
                        q.answers.map((ans,i)=>({ ...ans, correct:i===aIdx }))
                      )}
                    />
                    Correct
                  </RadioWrap>
                </AnswerGrid>
              ))}
            </QuestionBox>
          ))}
        </CategoryBox>
      ))}

      <Btn disabled={sending} onClick={publish}>
        {sending ? "Saving…" : "Publish Quiz"}
      </Btn>
    </Page>
  );
}
