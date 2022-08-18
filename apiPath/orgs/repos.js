// 錯誤處理

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
      console.error("client error:", e.status);
      console.error("client error:", e.statusText);
      // api server 錯誤: 404
      // api server 錯誤: Not Found

      // client error: 403
      // client error: rate limit exceeded

      return { status: e.status, message: e.statusText };
    });
}
