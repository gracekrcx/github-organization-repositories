import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

import Repositories from "../components/Repositories";
import getRepositories from "../apiPath/orgs/repos";
import { useStore } from "../context/store";
import Input from "../commonComponents/Input";

export default function Home() {
  // call api
  const [search, setSearch] = useState({ text: "fb", page: 1 });
  const { setRepositories } = useStore();

  const handlePlusOne = useCallback(() => {
    setSearch((val) => ({ ...val, page: val.page + 1 }));
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await getRepositories(search);
  //     setRepositories(result);
  //   }
  //   fetchData();
  // }, [search, setRepositories]);

  return (
    <div>
      <Head>
        <title>github-organization-repositories</title>
        <meta name="description" content="github-organization-repositories" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <>
        <Input />
        <Repositories handlePlusOne={handlePlusOne} />
      </>
    </div>
  );
}
