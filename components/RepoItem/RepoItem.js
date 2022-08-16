import { useCallback, useRef } from "react";
import { RepoItemContainer } from "./styled";
import Circle from "../../commonComponents/Circle";
import Image from "next/image";
import star from "../../sources/svg/star.svg";
import forked from "../../sources/svg/forked.svg";
import law from "../../sources/svg/law.svg";
import issueSvg from "../../sources/svg/issue-svg.svg";
import pullRequest from "../../sources/svg/git-pull-request.svg";
import getMonth from "../../utils/getMonth";

export default function RepoItem({ item, lastElement = false }) {
  const observer = useRef(null);
  const {
    name,
    description,
    topics,
    language,
    stargazers_count,
    visibility,
    license,
    lastUpdate,
    forks_count,
    open_issues_count,
    pulls_url,
    updated_at,
  } = item;

  const stars = stargazers_count.toLocaleString();
  const fork = forks_count.toLocaleString();
  const issue = open_issues_count.toLocaleString();

  const updatedTime = () => {
    const update = Date.parse(updated_at);
    // 現在的時間
    const current = Date.now();
    // 1 小时 = 3600000 毫秒
    const hour = Math.floor((current - update) / 3600000);

    if (hour < 1) {
      return "Updated a few minutes ago";
    }
    if (hour > 24) {
      // 大於 24 : 顯示時間
      const d = new Date(updated_at);
      const date = d.getDate();
      const year = d.getFullYear();
      const monthNum = d.getMonth();
      console.log(monthNum);
      const month = getMonth(monthNum);

      return `Updated on ${month} ${date}, ${year}`;
    }
    return `Updated ${hour} hour ago`;
  };

  return (
    <RepoItemContainer>
      <div className="titleWrap">
        <div className="title">{name}</div>
        <div className="visibility">{visibility}</div>
      </div>

      <div className="descr">{description}</div>

      <div className="others">
        <span className="msgWrap">
          <Circle text={language} />
          <span className="msg">{language}</span>
        </span>
        <span className="msgWrap">
          <Image src={star} alt="" width="16" height="16" />
          <span className="msg">{stars}</span>
        </span>

        <span className="msgWrap">
          <Image src={law} alt="" width="16" height="16" />
          <span className="msg">{license?.spdx_id}</span>
        </span>

        <span className="msgWrap">
          <Image src={forked} alt="" width="16" height="16" />
          <span className="msg">{fork}</span>
        </span>

        <span className="msgWrap">
          <Image src={issueSvg} alt="" width="16" height="16" />
          <span className="msg">{issue}</span>
        </span>
        <>{updatedTime()}</>
        {/* <span className="msgWrap">
          <Image src={pullRequest} alt="" width="16" height="16" />
        </span> */}
      </div>
    </RepoItemContainer>
  );
}
