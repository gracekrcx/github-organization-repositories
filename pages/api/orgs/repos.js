export default async function repos(req, res) {
  const { keyword, page } = req.query;
  console.log({ keyword, page });

  const org = "facebook";
  const type = "public";
  const sort = "updated";
  const direction = "desc";
  const query = `type=${type}&sort=${sort}&direction=${direction}&page=${page}&per_page=25`;

  const result = await fetch(
    `https://api.github.com/orgs/${org}/repos?${query}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((res) => {
      console.log("-- api server 成功");
      return res;
    })
    .catch((e) => {
      console.log("-- api server 錯誤");
      return e;
    });

  res.json(result);
}
