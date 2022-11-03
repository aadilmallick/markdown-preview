import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeFont } from "./features/font/fontSlice";
import { SettingsButton } from "./components/SettingsButton";

const ButtonsContainer = styled.div`
  max-width: 700px;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const ResultsContainer = styled.article`
  font-family: ${(props) => {
    if (props.font === "normal") return "var(--normal)";
    if (props.font === "cursive") return "var(--cursive)";
    if (props.font === "monospace") return "var(--monospace)";
  }};
`;

function App() {
  const [markdown, setMarkdown] = useState("## markdown preview");
  const dispatch = useDispatch();
  const font = useSelector((store) => {
    console.log(store);
    return store.font.font;
  });
  return (
    <main>
      <ButtonsContainer>
        <SettingsButton
          cursive
          onFontChange={() => dispatch(changeFont("cursive"))}
        >
          Cursive
        </SettingsButton>
        <SettingsButton
          monospace
          onFontChange={() => dispatch(changeFont("monospace"))}
        >
          Monospace
        </SettingsButton>
        <SettingsButton onFontChange={() => dispatch(changeFont("normal"))}>
          Normal
        </SettingsButton>
      </ButtonsContainer>
      <section className="markdown">
        <textarea
          className="input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <ResultsContainer className="result" font={font}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </ResultsContainer>
      </section>
    </main>
  );
}

export default App;
