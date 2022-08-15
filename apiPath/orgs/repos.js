// 錯誤處理

export default function orgsRepos({ keyword = "iamkeyword", page = 1 }) {
  return fetch(`api/orgs/repos?keyword=${keyword}&page=${page}`)
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
      return null;
    });
}
