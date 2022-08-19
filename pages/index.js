import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Repositories from "components/Repositories";
import Container from "commonComponents/Container";
import SelectorContainer from "components/SelectorContainer";
import getRepositories from "apiPath/orgs/repos";
import { useStore } from "context/store";
import { Header, ErrorMessage } from "css/style";
import { InputWrapper } from "css/customStyle";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const infiniteFetch = useCallback(() => {
    setLoading(true);
    setSearch((val) => ({ ...val, page: val.page + 1 }));
  }, []);

  const pushRouter = useCallback(
    (val) => {
      const filter = { ...search, ...val };
      const { type, sort, direction, keyword } = filter;

      router.push({
        query: { type, sort, direction, q: keyword },
      });
    },
    [search, router]
  );

  // filter 改變
  const filterUpdateSearch = useCallback(
    (val) => {
      setRepositories([]);
      setSearch((pre) => ({ ...pre, ...val, page: 1 }));
      pushRouter(val);
    },
    [setRepositories, pushRouter]
  );

  // (4) fetch api
  const fetchRepositories = useCallback(
    async (data) => {
      const result = await getRepositories(data);

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

  const debouncedPushRouter = useCallback(
    (val) => {
      router.push({
        query: { q: val },
      });
    },
    [router]
  );

  const handlePushRouter = useMemo(
    () =>
      debounce((search) => {
        debouncedPushRouter(search);
      }, debounceTime),
    [debouncedPushRouter]
  );

  // (1) input change
  const handleSearch = (e) => {
    const value = e.target.value;
    const valueTrim = value.trim();

    setSearch((val) => ({ ...val, keyword: valueTrim, page: 1 }));
    setRepositories([]);
    handlePushRouter(valueTrim);
  };

  return (
    <div>
      <Head>
        <title>github-organization-repositories</title>
        <meta name="description" content="github-organization-repositories" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
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
        {errorMessage && search.keyword && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </Container>
    </div>
  );
}
