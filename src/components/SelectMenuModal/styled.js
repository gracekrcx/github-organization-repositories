import styled from "styled-components";
import { MOBILE } from "css/customStyle";

export const SelectMenuModalWrapper = styled.div`
  position: absolute;
  top: 40px;
  width: 300px;
  box-shadow: 2px 3px 14px rgb(140 149 159 / 20%);

  ${MOBILE} {
    width: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    padding: 16px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      background-color: #1b1f24;
      opacity: 0.5;
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  max-height: 66%;
  margin: auto 0;
  overflow: hidden;
  pointer-events: auto;
  border-radius: 12px;
  background-color: #fff;
  flex: auto;
  flex-direction: column;
  font-size: 14px;
`;

export const MenuHeader = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid #d8dee4;

  .btn {
    background-color: transparent;
    border: 0;
    padding: 16px;
    margin: -16px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    flex: 1;
    font-weight: 600;
  }
`;

export const MenuList = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  margin-bottom: -1px;
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
    overflow: hidden;
    text-align: left;
    cursor: pointer;
    border: 0;
    border-bottom: 1px solid #d8dee4;

    .icon {
      opacity: 0;
    }

    .itemText {
      margin-left: 15px;
    }
  }
`;

export const RadioButton = styled.input`
  &:checked + .icon {
    opacity: 1;
    display: flex;
  }
`;
