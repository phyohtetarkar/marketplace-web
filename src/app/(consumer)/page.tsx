import { HomeData } from "@/common/models";
import { getAPIBasePath, validateResponse } from "@/common/utils";
import HomePage from "./home-page";
import { cache } from "react";

const getHomeData = cache(async () => {
  const url = getAPIBasePath() + "/content/home";
  const resp = await fetch(url, {
    cache: "no-cache",
    headers: {
      "Accept-Language": "en"
    }
  });

  return resp
    .json()
    .then((json) => json as HomeData)
    .catch((e) => undefined);
});

export default async function Home() {
  const data = await getHomeData();

  return <HomePage data={data} />;
}
