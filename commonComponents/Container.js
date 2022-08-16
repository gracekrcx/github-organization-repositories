import styled from "styled-components";

const Bg = styled.div`
  background: rgb(246, 248, 250);
`;

const ContainerWrapper = styled.div`
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 8px;
`;

export default function Container({ children }) {
  return (
    <Bg>
      <ContainerWrapper>{children}</ContainerWrapper>
    </Bg>
  );
}
