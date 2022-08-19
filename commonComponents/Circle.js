import styled from "styled-components";

const CircleWrapper = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;

export default function Circle({ text }) {
  const bgColor = () => {
    switch (text) {
      case "TypeScript":
        return "#3178c6";
      case "JavaScript":
        return "#f1e05a";
      case "C++":
        return "#f34b7d";
      case "Python":
        return "#3572A5";
      case "C#":
        return "#178600";
      default:
        return "#555555";
    }
  };

  return <CircleWrapper bgColor={bgColor} />;
}
