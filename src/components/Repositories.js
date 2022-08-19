import { memo } from "react";
import { StoreContextConsumer } from "context/store";
import Spinner from "commonComponents/Spinner";
import { ReposContainer } from "css/style";
import RepoItem from "./RepoItem";

const Repositories = memo(({ infiniteScrollFetch, loading }) => {
  const renderRepositories = (repositories) => {
    if (repositories?.length) {
      return (
        <>
          {repositories.map((i, index) => (
            <RepoItem
              item={i}
              key={i.id}
              lastElement={index + 1 === repositories.length}
              infiniteScrollFetch={infiniteScrollFetch}
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
          <ReposContainer>
            <div>{renderRepositories(repositories)}</div>
            {loading && <Spinner />}
          </ReposContainer>
        );
      }}
    </StoreContextConsumer>
  );
});

Repositories.displayName = "Repositories";
export default Repositories;
