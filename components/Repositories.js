import { useRef, memo } from "react";
import { StoreContextConsumer } from "../context/store";
import Spinner from "../commonComponents/Spinner";
import RepoItem from "./RepoItem";

const Repositories = memo(({ handlePlusOne }) => {
  // const ref = useRef(0);
  // console.log(ref.current++);
  const loading = false;

  const renderRepositories = (repositories) => {
    // console.log("--> page", repositories);
    if (repositories?.length) {
      return (
        <>
          {repositories.map((i, index) => (
            <RepoItem
              item={i}
              key={i.name}
              lastElement={index + 1 === repositories.length}
            />
          ))}
        </>
      );
    }
    if (repositories?.length === 0 || loading) {
      return null;
    }
    {
      /* if ("沒有搜尋結果") {
            repositories?.length === 0
            &&
            searchData.keyword === 'xxxooo'
            -->
            return <ErrorMessage />;
          } */
    }
  };

  return (
    <StoreContextConsumer>
      {({ repositories }) => {
        return (
          <>
            <div>{renderRepositories(repositories)}</div>
            {loading && <Spinner />}
          </>
        );
      }}
    </StoreContextConsumer>
  );
});

Repositories.displayName = "Repositories";
export default Repositories;
