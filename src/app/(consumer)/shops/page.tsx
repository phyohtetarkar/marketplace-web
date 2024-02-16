import { ShopQuery } from "@/services/ShopService";
import ShopsPage from "./shops-page";

export default function Shops({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q, page } = searchParams;

  const cityId = searchParams["city-id"];

  var query: ShopQuery = {
    q: typeof q === "string" ? q : undefined,
    "city-id": typeof cityId === "string" ? parseInt(cityId) : undefined,
    page: typeof page === "string" ? parseInt(page) : undefined
  };

  return <ShopsPage query={query} />;
}
