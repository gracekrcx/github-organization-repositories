import styled from "styled-components";

const ButtonWrapper = styled.button`
  /* 處理一下 primary */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  padding: 0.25em 1em;
  margin-right: 10px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fontFamily};
`;

export default function Button() {
  return <ButtonWrapper>Normal</ButtonWrapper>;
}
