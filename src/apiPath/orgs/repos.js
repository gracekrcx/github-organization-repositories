export default function orgsRepos({
  keyword = "",
  page = 1,
  type = "all",
  sort = "created",
  direction = "desc",
}) {
  return fetch(
    `api/orgs/repos?keyword=${keyword}&type=${type}&sort=${sort}&direction=${direction}&page=${page}&per_page=10`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((resJson) => {
      return resJson;
    })
    .catch((e) => {
      // 錯誤: 404
      // 錯誤: Not Found

      // 錯誤: 403
      // 錯誤: rate limit exceeded

      return { status: e.status, message: e.statusText };
    });
}
