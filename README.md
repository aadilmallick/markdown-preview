# Markdown-preview Project

## Roadmap

1. Create textarea for user markdown input and a container for the outputted results
2. Have some way of converting markdown string into markdown styling.
3. Change the fonts with buttons

## Basic TextArea and Markdown conversion

```javascript
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [markdown, setMarkdown] = useState("## markdown preview");

  return (
    <main>
      <section className="markdown">
        <textarea
          className="input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <article className="result">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}
```

The `<ReactMarkdown>` component from "react-markdown" renders any string passed into it as a child as markdown. Behind the scenes, the markdown style translates into HTML elements, so you can style HTML elements normally to influence the styling of the markdown.

> Process

1. Create a textarea controlled by state, `markdown`.
2. render `markdown` as a child of the `<ReactMarkdown>` component.

## Fun with Styled components

```javascript
const StyledButton = styled.button`
  font-family: ${(props) => {
    if (props.cursive) return "cursive";
    if (props.monospace) return "monospace";
  }};
  font-size: 16px;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-primary-5);
  }
`;
```

## Redux

### Font slice

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  font: "normal",
};

const fontslice = createSlice({
  name: "font",
  initialState: initialState,
  reducers: {
    changeFont: (state, action) => {
      const font = action.payload;
      state.font = font;
    },
  },
});

export const fontReducer = fontslice.reducer;
export const { changeFont } = fontslice.actions;
```

The font slice will keep track of the current font of the application, and will change the font using the `changeFont` action.

- The `changeFont` action, when dispatched, will accept a payload, which should be a string, saying "normal", "cursive", and "monospace"

### Using full functionality

In the styled components styled article that we call `ResultsContainer`, we use the font state passed in to change the font-family of the resulting markdown preview.

```javascript
const ResultsContainer = styled.article`
  font-family: ${(props) => {
    if (props.font === "normal") return "var(--normal)";
    if (props.font === "cursive") return "var(--cursive)";
    if (props.font === "monospace") return "var(--monospace)";
  }};
`;
```

```javascript
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
```
