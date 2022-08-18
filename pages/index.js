import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Repositories from "../components/Repositories";
import SelectorContainer from "../components/SelectorContainer";
import getRepositories from "../apiPath/orgs/repos";
import { useStore } from "../context/store";
import Container from "../commonComponents/Container";
import { Header, ErrorMessage } from "../css/style";
import { InputWrapper } from "../css/customStyle";
import debounce from "lodash/debounce";

const debounceTime = 1500;

export default function Home() {
  const [search, setSearch] = useState({
    keyword: "",
    page: 1,
    type: "all",
    sort: "created",
    direction: "desc",
  });
  const { setRepositories } = useStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const infiniteFetch = useCallback(() => {
    setLoading(true);
    setSearch((val) => ({ ...val, page: val.page + 1 }));
  }, []);

  // filter 改變
  const filterUpdateSearch = useCallback(
    (val) => {
      setRepositories([]);
      setSearch((pre) => ({ ...pre, ...val, page: 1 }));
    },
    [setRepositories]
  );

  // (4) fetch api
  const fetchRepositories = useCallback(
    async (data) => {
      console.log("---Client-Fetch API ---> 觸發");
      const result = await getRepositories(data);
      console.log("--> res", result);

      // 確認資料型態
      if (Array.isArray(result)) {
        if (result.length > 0) {
          setRepositories((prev) => [...prev, ...result]);
        } else {
          // 沒有更多資料
          setErrorMessage("Sorry 無更多資料了");
        }
      } else {
        // 顯示錯誤訊息
        setRepositories([]);
        if (result?.status === 404) {
          setErrorMessage("無相關資料");
        } else {
          setErrorMessage("系統有些問題 請稍候再試");
        }
      }
      setLoading(false);
    },
    [setRepositories]
  );

  // (3) debounce
  const debouncedSearch = useMemo(
    () =>
      debounce((search) => {
        fetchRepositories(search);
      }, debounceTime),
    [fetchRepositories]
  );

  // (2) detect change
  useEffect(() => {
    if (search.keyword) {
      setLoading(true);
      setErrorMessage(null);
      debouncedSearch(search);
    }
  }, [debouncedSearch, search]);

  // (1) input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch((val) => ({ ...val, keyword: value, page: 1 }));
    setRepositories([]);
  };

  return (
    <div>
      <Head>
        <title>github-organization-repositories</title>
        <meta name="description" content="github-organization-repositories" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Container>
        <Header>
          <InputWrapper
            type="text"
            name="search"
            onChange={handleSearch}
            placeholder="search"
          />
          <SelectorContainer
            search={search}
            filterUpdateSearch={filterUpdateSearch}
          />
        </Header>
        <Repositories infiniteFetch={infiniteFetch} loading={loading} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </div>
  );
}
