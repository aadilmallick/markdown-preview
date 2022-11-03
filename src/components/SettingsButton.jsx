import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";

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

export const SettingsButton = ({ onFontChange, ...rest }) => {
  return (
    <StyledButton
      {...rest}
      onClick={() => {
        onFontChange();
      }}
    />
  );
};
