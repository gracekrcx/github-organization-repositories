import styled from "styled-components";

const InputWrapper = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  outline: none;
  ::placeholder {
    color: palevioletred;
  }
`;

export default function Input() {
  return <InputWrapper type="text" placeholder="Search" />;
}
