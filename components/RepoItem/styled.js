import styled from "styled-components";

export const RepoItemContainer = styled.div`
  background-color: #fff;
  padding: 16px;
  margin-top: 8px;
  border-radius: 6px;
  transition: box-shadow 0.2s ease-in-out;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: rgba(140, 149, 159, 0.15) 0px 3px 6px 0px;
  }

  .titleWrap {
    display: flex;
    margin-bottom: 7px;
  }

  .title {
    font-size: 18px;
    overflow-wrap: break-word;
    font-weight: 500;
    color: ${(props) => props.theme.colors.primary};
    margin-right: 10px;
  }

  .visibility {
    border-radius: 24px;
    padding: 0 7px;
    border: 1px solid #d0d7de;
    font-size: 12px;
    line-height: 19px;
    font-weight: 400;
    width: 34px;
    height: 19px;
  }

  .descr {
    font-size: 14px;
    overflow-wrap: break-word;
    margin-bottom: 20px;
  }

  .groupTags {
    margin-top: 8px;
  }

  .others {
    font-size: 12px;
    color: #57606a;
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;

    .msgWrap {
      display: flex;
      align-items: center;
    }

    .msg {
      margin-left: 5px;
      margin-right: 16px;
      display: inline-block;
    }
  }
`;
