import { HomeData } from "@/common/models";
import { getAPIBasePath, parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import { cache } from "react";
import HomePage from "./home-page";

const getHomeData = cache(async () => {
  const url = getAPIBasePath() + "/content/home";

  const resp = await fetch(url, {
    cache: "no-cache",
    headers: {
      "Accept-Language": "en"
    }
  });

  return resp.json() as Promise<HomeData>;
});

export default async function Home() {
  try {
    const data = await getHomeData();

    return <HomePage data={data} />;
  } catch (error) {
    return (
      <div className="container py-3">
        <Alert message={parseErrorResponse(error)} variant="danger" />
      </div>
    );
  }
}
