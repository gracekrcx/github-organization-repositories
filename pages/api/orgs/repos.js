import { normalizer } from "utils/normalizer";

export default async function repos(req, res) {
  const { keyword, type, sort, direction, page, per_page } = req.query;
  const query = `type=${type}&sort=${sort}&direction=${direction}&page=${page}&per_page=${per_page}`;

  const result = await fetch(
    `https://api.github.com/orgs/${keyword}/repos?${query}`,
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
    .then(normalizer)
    .catch((e) => {
      return e;
    });

  res.status(result.status || 200).json(result);
}
