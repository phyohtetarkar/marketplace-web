import { HomeData } from "@/common/models";
import { getAPIBasePath } from "@/common/utils";
import { cache } from "react";
import HomePage from "./home-page";

const getHomeData = cache(async () => {
  const url = getAPIBasePath() + "/content/home";
  try {
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
  } catch (error) {
    console.error(error);
  }
  return undefined;
});

export default async function Home() {
  const data = await getHomeData();

  return <HomePage data={data} />;
}
