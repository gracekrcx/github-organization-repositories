import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";

import Repositories from "../components/Repositories";
import getRepositories from "../apiPath/orgs/repos";
import { useStore } from "../context/store";
import Container from "../commonComponents/Container";
import Button from "../commonComponents/Button";
import { Header } from "../css/style";
import { InputWrapper } from "../css/customStyle";
import debounce from "lodash/debounce";

const debounceTime = 1500;

export default function Home() {
  // call api
  const [search, setSearch] = useState({ keyword: "", page: 1 });
  const { setRepositories } = useStore();

  const handlePlusOne = useCallback(() => {
    setSearch((val) => ({ ...val, page: val.page + 1 }));
  }, []);

  // (4) fetch api
  const fetchRepositories = useCallback(
    async (search) => {
      console.log("-----> 觸發", search);
      const result = await getRepositories(search);
      setRepositories(result);
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
      debouncedSearch(search);
    }
  }, [debouncedSearch, search]);

  // (1) input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch({ keyword: value, page: 1 });
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
          <InputWrapper type="text" name="search" onChange={handleSearch} />
          <div className="buttoWrapper">
            <Button />
            <Button />
            <Button />
          </div>
        </Header>
        <Repositories handlePlusOne={handlePlusOne} />
      </Container>
    </div>
  );
}
