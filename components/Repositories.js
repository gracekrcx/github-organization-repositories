import { useRef, memo } from "react";
import { StoreContextConsumer } from "../context/store";
import Spinner from "../commonComponents/Spinner";
import RepoItem from "./RepoItem";

const Repositories = memo(({ infiniteFetch, loading }) => {
  // const ref = useRef(0);
  // console.log(ref.current++);

  const renderRepositories = (repositories) => {
    // console.log("--> page", repositories);
    if (repositories?.length) {
      return (
        <>
          {repositories.map((i, index) => (
            <RepoItem
              item={i}
              key={i.id}
              lastElement={index + 1 === repositories.length}
              infiniteFetch={infiniteFetch}
            />
          ))}
        </>
      );
    }

    return null;
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
