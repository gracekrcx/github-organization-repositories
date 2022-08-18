const singleRepoNormalizer = (repo) => {
  const {
    id,
    name,
    description,
    language,
    stargazers_count,
    visibility,
    license,
    forks_count,
    open_issues_count,
    updated_at,
  } = repo || {};

  return {
    id,
    name,
    description,
    language,
    stargazers_count,
    visibility,
    license,
    forks_count,
    open_issues_count,
    updated_at,
  };
};

export const normalizer = (res) => {
  return (res ? res : []).map(singleRepoNormalizer);
};
