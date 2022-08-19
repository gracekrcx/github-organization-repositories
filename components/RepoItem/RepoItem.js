import { useCallback, useRef, useEffect } from "react";
import { RepoItemContainer } from "./styled";
import Circle from "../../commonComponents/Circle";
import Image from "next/image";
import star from "../../sources/svg/star.svg";
import forked from "../../sources/svg/forked.svg";
import law from "../../sources/svg/law.svg";
import issueSvg from "../../sources/svg/issue-svg.svg";
import getMonth from "../../utils/getMonth";
import useOnScreen from "../../hooks/useOnScreen";
import { msToHour } from "../../utils/getTime";

// img : icon
// value : 數據
const Info = ({ img, value }) => {
  return (
    <span className="msgWrap">
      <Image src={img} alt="" width="16" height="16" />
      <span className="msg">{value}</span>
    </span>
  );
};

const UpdatedTime = ({ updatedAt }) => {
  const update = Date.parse(updatedAt);
  const current = Date.now();
  // 1 小时 = 3600000 毫秒
  const hour = Math.floor(msToHour(current - update));

  if (hour < 1) {
    return <span>Updated a few minutes ago</span>;
  }
  if (hour > 24) {
    // 大於 24 : 顯示時間
    const d = new Date(updatedAt);
    const date = d.getDate();
    const year = d.getFullYear();
    const monthNum = d.getMonth();
    const month = getMonth(monthNum);

    return <span>{`Updated on ${month} ${date}, ${year}`}</span>;
  }
  return <span>{`Updated ${hour} hour ago`}</span>;
};

export default function RepoItem({ item, lastElement = false, infiniteFetch }) {
  const {
    name,
    description,
    language,
    stargazers_count,
    visibility,
    license,
    forks_count,
    open_issues_count,
    updated_at,
    owner,
  } = item;

  const stars = stargazers_count.toLocaleString();
  const fork = forks_count.toLocaleString();
  const issue = open_issues_count.toLocaleString();

  // infinite-scroll
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (lastElement && isVisible) {
      console.log("------//-------> infinite Fetch 觸發");
      infiniteFetch();
    }
  }, [isVisible, infiniteFetch, lastElement]);

  const mockUrl = `https://github.com/${owner?.login}/${name}`;

  return (
    <RepoItemContainer ref={lastElement ? ref : null}>
      <div className="titleWrap">
        <div className="title">
          <a target="_blank" rel="noreferrer" href={mockUrl}>
            {name}
          </a>
        </div>
        <div className="visibility">{visibility}</div>
      </div>
      <div className="descr">{description}</div>
      <div className="others">
        <span className="msgWrap">
          <Circle text={language} />
          <span className="msg">{language}</span>
        </span>
        <Info img={star} value={stars} />
        <Info img={law} value={license?.spdx_id} />
        <Info img={forked} value={fork} />
        <Info img={issueSvg} value={issue} />
        <UpdatedTime updatedAt={updated_at} />
        {/* <span className="msgWrap">
          <Image src={pullRequest} alt="" width="16" height="16" />
        </span> */}
      </div>
    </RepoItemContainer>
  );
}
