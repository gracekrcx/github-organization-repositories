import styled from "styled-components";

export const Header = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  border-bottom: 2px solid #d0d7de;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(246, 248, 250);
`;

export const ReposContainer = styled.div`
  padding: 0 4px;
`;

export const ErrorMessage = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
